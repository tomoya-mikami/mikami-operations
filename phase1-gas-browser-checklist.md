# Phase1 本番GAS ブラウザ目視チェックリスト

最終更新: 2026-05-26

## 結論

Alf環境から本番GASへ認証済みで読み取る経路がなかったため、次は三神さんがブラウザで本番GASを開き、目視で「名前だけ」を確認する。

削除・変更・実行はしない。

## 開く対象

GASプロジェクトID:

`1pT-zVau4y54GsXmFzgIweETGvAuKymK_IzCxBVcfAez7mSwyj0D6KcTA`

## 絶対禁止

- GASコードを編集しない。
- 保存ボタンを押さない。
- 実行ボタンを押さない。
- トリガーを追加・削除・変更しない。
- Script Propertiesの値をコピーしない。
- APIキー、トークン、ルームID、メールアドレス等の値を保存しない。
- Google Driveファイルを削除・移動しない。

## 1. ファイル一覧確認

以下の本番12ファイルがあるか、`あり/なし/不明` だけ確認する。

| ファイル | 結果 |
|---|---|
| `dashboard_manager.gs` |  |
| `tax_doc_checker.gs` |  |
| `auto_file_sorter.gs` |  |
| `auto_file_renamer.gs` |  |
| `auto_inventory_logger.gs` |  |
| `invoice_email_saver_v3.gs` |  |
| `ebay_yen_converter.gs` |  |
| `ebay_doc_processor.gs` |  |
| `receipt_email_processor.gs` |  |
| `restore_tax_doc_master.gs` |  |
| `screenshot_data_extractor.gs` |  |
| `outsource_invoice_check.gs` |  |

## 2. 不要候補4ファイル確認

以下があるか、`あり/なし/不明` だけ確認する。

| ファイル | 結果 |
|---|---|
| `コード.gs` |  |
| `outsource_tally.gs` |  |
| `update_keywords_and_resort.gs` |  |
| `auto_invoice_bridge.gs` |  |

## 3. トリガー確認

Apps Scriptの「トリガー」画面を開き、以下だけ確認する。

- 関数名
- 実行頻度
- 実行時刻

値、認証情報、通知先などは記録しない。

| 関数名 | 頻度/時刻 | 結果 |
|---|---|---|
| `saveInvoicesFromGmail_v3` | 毎日 8:00想定 |  |
| `processReceiptEmails` | 毎日 9:00想定 |  |
| `processPurchaseEmails` | 毎日 10:00 / 22:00想定 |  |
| `processScreenshots` | 毎日 21:00想定 |  |
| `runAutoSorterWithRename` | 毎日 23:00想定 |  |
| `collectTaxDocuments` | 毎月7日 9:00想定 |  |
| `collectEbayInvoices` | 毎月7日 10:00想定 |  |
| `tallyMonthlyRewards` | 毎月7日 11:00想定 |  |
| `checkInvoicesAndAlert` | 毎月11日 9:00想定 |  |
| `checkTaxDocuments` | 毎月15日 9:00想定 |  |

## 4. Script Properties確認

プロジェクト設定のScript Propertiesを開き、キー名だけ確認する。

注意:

- 値は見ない。
- 値はコピーしない。
- スクリーンショットに値を写さない。
- キー名だけを記録する。

記録欄:

```text
Script Propertiesキー名:
- 
- 
- 
```

## 5. ダッシュボード/メニュー確認

eBay業務管理マスターのスプレッドシートを開き、以下だけ確認する。

| 確認項目 | 結果 |
|---|---|
| Phase1系のカスタムメニューがあるか |  |
| システム管理ダッシュボードがあるか |  |
| 手動実行ボタンがあるか |  |
| 最終実行日時の表示があるか |  |
| エラー/ログ表示があるか |  |

## Fay/Alfへ戻す形式

確認後、以下だけFayへ貼る。

```text
Phase1本番GASをブラウザで目視確認しました。

本番12ファイル:
- あり:
- なし:
- 不明:

不要候補4ファイル:
- あり:
- なし:
- 不明:

トリガー:
- 確認できた:
- 想定と違う:
- 不明:

Script Properties:
- キー名だけ確認済み:
- 確認できなかった:

ダッシュボード/メニュー:
- ある:
- ない:
- 不明:

注意:
- 削除・変更・実行はしていません。
- APIキーやトークンの値は保存していません。
```

