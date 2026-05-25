# Alf依頼: eBay業務自動化 Phase1 本番GAS読み取り確認

作成日: 2026-05-26

## 目的

eBay業務自動化 Phase1 の本番GASについて、削除・変更・実行をせず、読み取り確認だけを行う。

現在の正本は `ebay-automation-phase1-summary.md` と `ebay-phase1-startup-tasks.md` だが、旧チャットからの引き継ぎ内容と本番GAS実体が一致しているかを確認したい。

## 作業場所

`/Users/mikami/Documents/GitHub/mikami-operations-official`

## 参照する正本

- `ebay-automation-phase1-summary.md`
- `ebay-phase1-startup-tasks.md`
- `delegated-tasks.md`
- `projects.md`
- `handoff.md`

## 確認するもの

### 1. 本番GAS 12ファイルの実在

以下のファイルが本番GASプロジェクト内に存在するか、ファイル名だけ確認する。

- `dashboard_manager.gs`
- `tax_doc_checker.gs`
- `auto_file_sorter.gs`
- `auto_file_renamer.gs`
- `auto_inventory_logger.gs`
- `invoice_email_saver_v3.gs`
- `ebay_yen_converter.gs`
- `ebay_doc_processor.gs`
- `receipt_email_processor.gs`
- `restore_tax_doc_master.gs`
- `screenshot_data_extractor.gs`
- `outsource_invoice_check.gs`

### 2. トリガー一覧

トリガー一覧を確認し、以下だけ記録する。

- 関数名
- 実行頻度
- 実行時刻
- 紐づくファイル名が分かる場合はファイル名

トリガーの変更、削除、追加はしない。

### 3. Script Propertiesの項目名だけ

Script Propertiesを確認し、キー名だけ記録する。

禁止:

- 値を表示・保存しない
- APIキー、トークン、ルームID、メールアドレス等の値を記録しない
- スクリーンショットに値を写さない

### 4. 不要候補4ファイルの実在

以下が存在するかだけ確認する。

- `コード.gs`
- `outsource_tally.gs`
- `update_keywords_and_resort.gs`
- `auto_invoice_bridge.gs`

削除はしない。

### 5. ダッシュボード/メニューの有無

本番スプレッドシートまたはGAS内で、以下が確認できるかを見る。

- `onOpen` メニュー
- システム管理ダッシュボード
- 手動実行ボタン
- 最終実行日時の表示
- エラー/ログ表示の有無

## 保存するもの

以下を `ebay-phase1-readonly-check-result.md` に保存する。

- 確認結果
- 未確認事項
- 次に実行してよいテスト案
- 実行前に三神さん確認が必要なテスト案
- 削除候補の確認結果。ただし削除可否は確定しない

必要に応じて以下も更新する。

- `ebay-automation-phase1-summary.md`
- `ebay-phase1-startup-tasks.md`
- `delegated-tasks.md`
- `handoff.md`

## 禁止事項

- GASコードを変更しない
- GAS関数を実行しない
- トリガーを変更しない
- トリガーを削除・追加しない
- Script Propertiesの値を保存しない
- APIキーやトークンの値を保存しない
- Google Driveファイルを削除・移動しない
- スプレッドシートの行・列・セルを変更しない
- 不要候補ファイルを削除しない

## 完了条件

- 本番GAS 12ファイルの実在確認結果がある
- トリガー一覧の確認結果がある
- Script Propertiesのキー名だけ確認結果がある
- 不要候補4ファイルの実在確認結果がある
- ダッシュボード/メニューの有無が分かる
- 未確認事項が整理されている
- 次に実行してよいテスト案が整理されている
- 変更ファイルを確認し、問題なければcommit/pushする

