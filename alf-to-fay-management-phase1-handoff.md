# AlfからFayへ: Phase1・経営管理 引き継ぎ

作成日: 2026-05-26

## 結論

Alf側では、Phase1本番GASとDrive構造の読み取り確認を終え、次の主戦場を「利益が見える経営管理」と「Phase1を安全に運用する仕組み」に移した。

本番GASの削除・変更・実行、Google Driveの削除・移動・リネームはしていない。

## 完了したこと

| 分野 | 完了内容 | 成果物 |
|---|---|---|
| Phase1本番GAS | 本番12ファイル、不用候補4ファイル、トリガーを読み取り確認 | `ebay-phase1-readonly-check-result.md` |
| runInvoiceBridge | 請求書メール保存先から税理士提出用投げ込みへコピーする中継と確認 | `ebay-phase1-readonly-check-result.md` |
| collect系関数 | `collectTaxDocuments` / `collectEbayInvoices` は現行リスト・トリガーでは未検出 | `ebay-phase1-readonly-check-result.md` |
| Drive構造 | フォルダ地図と振り分けルールを可視化 | `ebay-phase1-folder-map.md` |
| `00_要確認` | 見える50件をファイル名ベースで分類 | `ebay-phase1-needs-review-triage.md` |
| スクショOCR | `screenshot_data_extractor.gs` の存在と転記先候補を整理 | `ebay-phase1-needs-review-triage.md` |
| 現在地整理 | 終わったこと、課題、次作業を整理 | `phase1-management-work-summary.md` |
| 経営管理 | Google Sheets版v1の仕様を作成 | `management-defense-dashboard-v1-spec.md` |
| 安全運用 | Phase1を壊さず使う手順を作成 | `ebay-phase1-safe-operations-runbook.md` |
| 迷子ファイル | `00_要確認` の分類別移動先候補を整理 | `ebay-phase1-needs-review-move-plan.md` |

## 重要な判断

- `runInvoiceBridge` は現役トリガーがあるため、削除候補から外す。
- `00_要確認` は削除場所ではなく、判断待ち置き場として扱う。
- 経営防御ダッシュボードは、Phase1本番GASを直接改造せず、まず別シート/別タブで読み取り参照から作る。
- Script Propertiesは値が見えるリスクがあるため、まだ確認していない。
- スクショOCR系は実行するとファイル読み取りやシート更新が起きる可能性があるため、実行前確認が必要。

## Fayから三神さんへ確認するとよいこと

1. 経営防御ダッシュボードv1は、まずGoogle Sheets版でよいか。
2. 作成場所は本番管理シートを直接触らず、別タブ/別スプレッドシートからでよいか。
3. `00_要確認` の移動予定リストを、個別名をマスクして作ってよいか。
4. `2026` と `2026年` のようなフォルダ表記は、どちらを正にするか。
5. Script Propertiesは、キー名だけなら確認してよいか。少しでも不安なら未確認のままにする。

## 次にAlfで進めるとよいこと

| 優先 | 作業 | 注意 |
|---|---|---|
| 高 | 経営防御ダッシュボードv1のシート雛形を作る | 本番GASは変更しない |
| 高 | `00_要確認` のマスク済み移動予定リストを作る | 実移動はしない |
| 高 | Phase1実行ログシートの仕様を実装案に落とす | まず仕様だけ |
| 中 | eBay売上一覧、円換算、外注費、在庫ログの列名を読み取り確認 | 個人情報は保存しない |
| 中 | 年/月フォルダ表記の統一ルールを作る | Drive移動は確認後 |
| 中 | メール装飾画像の保存除外ルール案を作る | 削除は確認後 |

## Fay側の返し方

三神さんには、技術用語を減らして次のように伝えるとよい。

```text
Phase1は、集める仕組み自体はかなりできています。
今の課題は「迷子ファイルを減らすこと」と「利益が残っているかを一目で見る画面を作ること」です。
次は、本番GASを壊さず、別シートで経営ダッシュボードの試作を作るのが安全です。
```
