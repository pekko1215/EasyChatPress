## EasyChatPress
 - expressとsocket.ioを使った単純なチャットアプリ

## ファイルたち

### index.js
 - express.staticを使い、publicフォルダ以下を静的に提供する。
 - socketに送信されたデータを全員にブロードキャストする

### public/js/easychatpress.js
 - 接続、切断時にイベントを発生させ、入室退室のメッセージを表示させている。