/**
 * シートからプロンプトを取得し、OpenAI APIで文章生成して結果をシートに書き込む
 * 安全対策：実行履歴をプロパティに記録し、1分以内の再実行を防止
 */

function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu("独自コラム作成")
      .addItem("記事生成", "generateArticle")
      .addToUi();
  } catch (e) {
    Logger.log("onOpen UI取得エラー（デバッグ中かも）: " + e);
  }
}

function generateArticle() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
      "独自コラム記事作成シート"
    );
  const inputCell = "R14";
  const outputCell = "R26";

  // 再実行防止のためのタイムスタンプチェック
  const now = Date.now();
  const props = PropertiesService.getScriptProperties();
  const lastRun = Number(props.getProperty("last_run") || 0);

  if (now - lastRun < 10 * 1000) {
    // 30秒以内の再実行はスキップ
    Logger.log("連続実行防止のためスキップされました");
    return;
  }

  const prompt = sheet.getRange(inputCell).getValue();
  if (!prompt) {
    Logger.log("R14セルにプロンプトが入力されていません。");
    return;
  }

  const resultText = callOpenAI(prompt);

  // 書き込みが前と違うときだけ更新
  const currentText = sheet.getRange(outputCell).getValue();
  if (currentText !== resultText) {
    sheet.getRange(outputCell).setValue(resultText);
  }

  // 実行時刻を記録
  props.setProperty("last_run", String(now));
}

/**
 * OpenAI APIにリクエストを送る関数
 */
function callOpenAI(promptText) {
  const apiKey =
    PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");
  if (!apiKey) {
    Logger.log("APIキーが設定されていません。");
    return "エラー：APIキーが設定されていません。";
  }

  const url = "https://api.openai.com/v1/chat/completions";
  const payload = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "あなたは優秀な記事ライターです。" },
      { role: "user", content: promptText },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (!json.choices || !json.choices.length) {
      Logger.log("APIレスポンスに異常があります: " + response.getContentText());
      return "エラー：APIレスポンスに異常があります。";
    }

    return json.choices[0].message.content.trim();
  } catch (e) {
    Logger.log("OpenAI API呼び出しでエラーが発生しました: " + e);
    return "エラーが発生しました。";
  }
}
