# eBay業務自動化 Phase1 システムマップ

最終更新: 2026-05-25

## 結論

Phase1は「メール・CSV・スクショ・各種書類」を入口にして、Google Driveへ保管し、スプレッドシートへ集計し、税理士提出・経営確認・在庫確認へつなぐ仕組み。

## 全体図

```mermaid
flowchart LR
  subgraph INPUT["入口"]
    Gmail["Gmail<br/>請求書・領収書"]
    EbayDocs["eBay書類<br/>インボイス・CSV"]
    Outsource["外注請求書"]
    CardCsv["メルカードCSV"]
    Screenshots["スクショ / CSV"]
    Inventory["在庫情報"]
  end

  subgraph GAS["GAS処理"]
    InvoiceSaver["請求書メール自動保存"]
    ReceiptProcessor["領収書メール自動処理"]
    EbayProcessor["eBay書類取り込み"]
    YenConverter["eBay円貨換算"]
    OutsourceCheck["外注費集計・請求書チェック"]
    Sorter["書類自動振り分け"]
    Renamer["ファイル自動リネーム"]
    InventoryLogger["在庫ログ記録"]
    Extractor["スクショ/CSV抽出"]
    TaxChecker["税理士提出チェック"]
    Dashboard["管理メニュー / ダッシュボード"]
  end

  subgraph DRIVE["Google Drive保管"]
    InvoiceFolder["01_請求書メール"]
    OutsourceFolder["02_外注管理"]
    EbayFolder["03_eBayインボイス"]
    TaxFolder["04_税理士提出用"]
    CardFolder["メルカード利用明細"]
    SharedFolder["税理士共有フォルダ"]
  end

  subgraph SHEETS["スプレッドシート集計"]
    MasterSheet["eBay業務管理マスター"]
    SalesSheet["eBay売上一覧表"]
    FxSheet["円換算スプレッドシート"]
    OutsourceSheet["外注費一覧"]
    InventorySheet["在庫ログ"]
  end

  subgraph OUTPUT["使い道"]
    TaxSubmit["税理士提出"]
    MonthlyCheck["月次チェック"]
    Alerts["通知・アラート"]
    DefenseDash["経営防御ダッシュボード"]
  end

  Gmail --> InvoiceSaver --> InvoiceFolder
  Gmail --> ReceiptProcessor --> TaxFolder
  EbayDocs --> EbayProcessor --> EbayFolder
  EbayProcessor --> YenConverter --> FxSheet
  Outsource --> OutsourceCheck --> OutsourceFolder
  OutsourceCheck --> OutsourceSheet
  CardCsv --> CardFolder
  Screenshots --> Extractor --> MasterSheet
  Inventory --> InventoryLogger --> InventorySheet

  InvoiceFolder --> Sorter
  EbayFolder --> Sorter
  TaxFolder --> Sorter
  Sorter --> Renamer
  Renamer --> TaxFolder

  TaxFolder --> TaxChecker --> MasterSheet
  MasterSheet --> Dashboard
  SalesSheet --> DefenseDash
  FxSheet --> DefenseDash
  OutsourceSheet --> DefenseDash
  InventorySheet --> DefenseDash

  Dashboard --> MonthlyCheck
  TaxChecker --> TaxSubmit
  TaxChecker --> Alerts
  OutsourceCheck --> Alerts
  DefenseDash --> MonthlyCheck
```

## 三神さん向けの読み方

- GmailやCSVが入口。
- GASが自動で保存・分類・集計する。
- Google Driveは書類保管場所。
- スプレッドシートは数字と進捗の確認場所。
- 最終的に「税理士へ出せるか」「月次で抜けがないか」「利益が守れているか」を見る。

## 機能別の流れ

| 入力 | GAS | 保存先 | 集計先 | 最終確認 |
|---|---|---|---|---|
| 請求書メール | `invoice_email_saver_v3.gs` | 請求書メールフォルダ | eBay業務管理マスター | 請求書の保存漏れ |
| 領収書メール | `receipt_email_processor.gs` | 税理士提出用フォルダ | eBay業務管理マスター | 領収書の保存漏れ |
| eBayインボイス | `ebay_doc_processor.gs`, `ebay_yen_converter.gs` | eBayインボイスフォルダ | 円換算スプレッドシート | 手数料・請求額 |
| 外注請求書 | `outsource_invoice_check.gs` | 外注管理フォルダ | 外注費一覧 | 支払予定・不足 |
| 税理士提出書類 | `tax_doc_checker.gs` | 税理士提出用フォルダ | eBay業務管理マスター | 69項目チェック |
| 書類全般 | `auto_file_sorter.gs`, `auto_file_renamer.gs` | 各月・各種別フォルダ | eBay業務管理マスター | 整理状況 |
| 在庫情報 | `auto_inventory_logger.gs` | なし / シート中心 | 在庫ログ | 在庫・滞留 |
| スクショ/CSV | `screenshot_data_extractor.gs` | 必要に応じてDrive | eBay業務管理マスター | 手入力削減 |

## 月次運用イメージ

```mermaid
flowchart TD
  D1["毎日<br/>請求書・領収書を自動保存"] --> D2["毎日夜<br/>書類を自動振り分け"]
  D2 --> M7["毎月7日<br/>税理士書類収集 / eBay円換算 / 外注費集計"]
  M7 --> M11["毎月11日<br/>外注請求書チェック"]
  M11 --> M15["毎月15日<br/>税理士提出書類チェック"]
  M15 --> Review["三神さん確認<br/>不足書類・異常値・提出可否"]
  Review --> Tax["税理士提出"]
```

## 見える化で必要な画面

| 画面 | 見るもの | 判断 |
|---|---|---|
| 今日の処理状況 | 日次処理の成功/失敗、保存件数 | 今日見るべきエラーがあるか |
| 月次提出チェック | 69項目の提出状況 | 税理士へ出せるか |
| eBay費用確認 | eBay請求、円換算、手数料 | 売上に対して費用が重いか |
| 外注費確認 | 請求書有無、集計額 | 支払漏れ・請求漏れがないか |
| 書類整理状況 | 未分類、リネーム待ち、移動待ち | 手作業が必要か |
| 経営防御 | 売上、手数料、送料、関税、外注費、固定費、在庫 | 実質利益が残っているか |

## 注意

- Drive内の削除・移動は三神さん確認後。
- GASファイル削除は行わない。
- まずは「見える化」「テスト計画」「操作しやすさ改善」を優先する。
