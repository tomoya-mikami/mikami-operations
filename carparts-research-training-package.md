# カーパーツリサーチ研修・改善パッケージ

最終更新: 2026-05-27

## 結論

初めてのパートさん向けの作業標準化と、三神さん向けの改善/AI導入/一括出品/コスト削減提案を、以下の資料に分けて作成した。

## パートさん向け

| 資料 | 用途 |
|---|---|
| `carparts-research-operator-manual.md` | 作業手順、入力ルール、NG例、要確認基準 |
| `visuals/carparts-research-workflow-for-beginners.svg` | 作業工程を1枚で説明する図 |

## 三神さん・管理者向け

| 資料 | 用途 |
|---|---|
| `carparts-research-improvement-proposal.md` | 問題点、改善方法、AI導入、一括出品、リスク回避、売上安定化 |
| `visuals/carparts-research-ai-improvement-map.svg` | AI/自動化でどこを効率化するかの全体図 |
| `visuals/carparts-research-90day-roadmap.svg` | 90日で守りから売上拡大へ進めるロードマップ |
| `visuals/carparts-research-cover-generated.png` | 表紙用イラスト |

## 関連する実装資料

| 資料 | 用途 |
|---|---|
| `carparts-price-monitor-roadmap.md` | 価格監視・販売価格見直しロードマップ |
| `carparts-price-monitor-mvp-implementation.md` | 価格監視MVPの導入手順 |
| `gas/carparts_price_monitor_mvp.gs` | Google Sheetsへ貼るGAS MVP |
| `alf-carparts-price-monitor-mvp-request.md` | Alfで本番追加・10件テストするための依頼パケット |

## 使い方

1. パートさんには `carparts-research-operator-manual.md` と `visuals/carparts-research-workflow-for-beginners.svg` を渡す。
2. 管理者側では `carparts-research-improvement-proposal.md` を読んで、価格監視、CSV出力、AI補助、Shipping Policy候補の順で進める。
3. 本番シート側では、価格監視MVPを10件テストから始める。
4. Sellsta CSVの実出品テストが通ったら、外注出品作業を手入力からCSV確認へ移す。

## 次に作るとよいもの

- Google Slides/PDF版の研修資料。
- パートさん用チェックリストシート。
- 要確認キューの担当者別処理フロー。
- Sellsta CSV出力前チェックリスト。
- Shipping Policy候補の判定表。

