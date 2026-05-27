# Alf依頼: カーパーツ価格監視MVP 実装

最終更新: 2026-05-27

## 目的

カーパーツ管理用Google Sheetsに、モノタロウ価格変動、在庫切れ、取扱終了、利益率低下を検知する価格監視MVPを追加する。

既存入力シートを壊さず、新規タブとGAS追加で進める。

## 作業場所

Alf正式作業台:

`/Users/mikami/Documents/GitHub/mikami-operations-official`

参照ファイル:

- `carparts-price-monitor-roadmap.md`
- `carparts-price-monitor-mvp-implementation.md`
- `gas/carparts_price_monitor_mvp.gs`
- `carparts-manager-import-summary.md`
- `delegated-tasks.md` の T-026

## 対象スプレッドシート

三神さんが共有したカーパーツ用Google Sheets。

注意:

- スプレッドシートIDや認証情報はGitHubへ保存しない。
- 共有URLや生IDを正本Markdownへ追記しない。
- 必要な場合は三神さんのチャット本文、ブラウザ履歴、またはログイン済みGoogle Sheets画面から確認する。

## やってよいこと

- シート構造、タブ名、列構成、既存関数の読み取り確認。
- 既存列を壊さない新規タブ追加。
- `設定`、`価格監視マスター`、`価格履歴`、`販売価格見直し候補`、`手動確認キュー` の作成。
- `gas/carparts_price_monitor_mvp.gs` を別ファイルとしてApps Scriptへ追加。
- `初期セットアップ` の実行。
- 入力用シートから監視マスター作成。
- 10件、50件、100件の段階テスト。
- 結果、失敗パターン、取得率、実行時間の記録。
- 必要なコード修正。
- `handoff.md`、`delegated-tasks.md`、関連メモの更新。
- commit / push。

## やってはいけないこと

- 既存入力シートの列削除。
- 既存関数の上書き。
- 既存データの大量上書き。
- Google Driveファイルの削除、移動、リネーム。
- 認証JSON、APIキー、Secrets、トークン、サービスアカウント情報の表示・保存。
- eBay/Sellstaへの直接反映。
- 自動価格改定。
- 自動出品停止。
- 高頻度のモノタロウ巡回。

## 実行順

1. 最新の `main` をpullする。
2. `START_HERE.md`、`handoff.md`、`delegated-tasks.md`、`carparts-price-monitor-mvp-implementation.md` を読む。
3. 対象Google Sheetsをブラウザで開く。
4. 入力用タブ名、gid、列構成を読み取り確認する。
5. Apps Scriptに `gas/carparts_price_monitor_mvp.gs` を別ファイルとして追加する。
6. シートを再読み込みし、メニュー `カーパーツ価格監視` を確認する。
7. `初期セットアップ` を実行する。
8. 入力用シートを開いて `現在のシートから監視マスター作成` を実行する。
9. `価格監視マスター` の10行を選択し、`選択行だけ価格確認` を実行する。
10. 取得結果を確認し、失敗パターンを記録する。
11. 問題なければ50件、100件へ広げる。
12. `販売価格見直し候補` と `手動確認キュー` の出力を確認する。
13. 進捗を `handoff.md` と `delegated-tasks.md` に戻す。
14. commit / pushする。

## 完了条件

- 新規タブが作成されている。
- 既存入力シートが壊れていない。
- 10件以上の価格確認テスト結果がある。
- 価格取得成功/失敗/在庫状態/候補表示の挙動が確認されている。
- 自動価格改定・自動出品停止は実行していない。
- 結果が `handoff.md` と `delegated-tasks.md` に反映されている。
- GitHubへpush済み。

## 確認が必要な場合

止めるのは次の場合だけ:

- 削除が必要。
- 既存データを上書きする必要がある。
- 認証情報、APIキー、Secrets、個人情報を扱う必要がある。
- Google Driveファイルの削除/移動/リネームが必要。
- eBay/Sellsta/本番出品へ直接反映する必要がある。

