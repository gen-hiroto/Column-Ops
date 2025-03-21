# Column-Ops

⸻

使い方｜独自コラム記事作成シート

このスプレッドシートは、プロンプト（お題）から自動でコラム記事を作成できるツールです。
OpenAI API（GPT-4o）を使って、記事を自動生成し、所定のセルに出力します。

⸻

🔰 使い方手順

① スプレッドシートを開く

対象シート：「独自コラム記事作成シート」

⸻

② プロンプトを入力する

セル：R14 に、生成したい記事のお題や指示文を入力してください。
（例：健康アプリについて、主婦向けに紹介する記事を作ってください など）

⸻

③ メニューから「記事生成」をクリック

上部メニューに追加される「独自コラム作成」→「記事生成」をクリックします。

⸻

④ 数秒後、結果が表示される

生成された記事が セル：R26 に自動で出力されます。

⸻

⏱ 注意点
 • **10秒以内に連続実行するとスキップされます。**少し待ってから再実行してください。
 • APIキーが未設定だと動作しません（下記参照）。

⸻
ーー設定済みーー
🔑 APIキーの設定（初回のみ）
 1. メニュー「拡張機能」→「Apps Script」を開く
 2. 上部「歯車アイコン（設定）」→「スクリプトのプロパティ」
 3. 以下を追加：

プロパティ名 値
OPENAI_API_KEY （あなたのOpenAIのAPIキー）
ーーーーーーーー
⸻

🧪 補足
 • モデル：GPT-4o（高速・高性能）
 • 1回の出力：最大1000トークン程度
 • 出力先は固定（R26）ですが、必要に応じて変更可能です

⸻

ご不明な点があれば、お気軽にご相談ください！
必要であれば、このREADMEをスプレッドシート内に貼り付け用の形式（1セルに収まる）に整えることも可能です。
