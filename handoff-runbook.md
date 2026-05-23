# チャット引き継ぎ手順書

最終更新: 2026-05-24

## 三神さんがやること

### 新しいチャットでFayへ引き継ぐ

新チャットでこれだけ送る。

```text
Fay、START_HERE.mdから再開して。
```

Fayは `START_HERE.md` の順番で必要ファイルを読み、現在地を復元する。

### Alfへ作業させたい

Fayにこう言う。

```text
これはアルフで進めて。
```

Fayが作業内容を整理し、Alfへ渡す依頼文を作る。

### Alfのチャットがいっぱいになった

Fayにこう言う。

```text
Alfのチャットがいっぱいになった。移行用プロンプトを作って。
```

Fayが `alf-restart-prompt.md` を使って、Alf新チャットに貼る文を作る。

### Fayのチャットがいっぱいになった

Alfにこう言う。

```text
Fayのチャットがいっぱいになった。fay-restart-prompt.md を使って、Fay新チャット用の引き継ぎを作って。
```

AlfがGitHub共通作業台を更新し、Fay新チャットに貼る文を作る。

### スマホから指示する

スマホでは長い説明を貼らず、こう指示する。

```text
Fay、START_HERE.mdから再開して。〇〇をアルフで進める依頼文を作って。
```

重い作業はAlfへ回し、Fayは司令塔として依頼文、優先順位、進捗確認を担当する。

### 端末をまたぐとき

- Alfが作業した後: Fay側で最新状態を確認する。
- FayがAlfへ渡す前: 必要ならGitHubへpushする。
- 同じ端末・同じ作業台で続けるだけなら、毎回GitHub同期は不要。

## Fayが自動でやること

- `START_HERE.md` から再開する。
- 進捗を `handoff.md` に残す。
- 決定事項を `意思決定ログ.md` に残す。
- 分割作業を `delegated-tasks.md` に残す。
- 必要に応じてcommit/pushする。
- チャットが長くなったら早めに引き継ぎ更新を提案する。

## AlfがFayの移行を補助するとき

- `git pull origin main` で最新化する。
- `START_HERE.md`、`handoff.md`、`projects.md`、`delegated-tasks.md` を読む。
- `fay-restart-prompt.md` を使って、Fay新チャット用の文を作る。
- 必要なら `handoff.md` と `delegated-tasks.md` を更新する。
- commit/pushして、三神さんに貼る文を報告する。

## 確認が必要なこと

- ファイル削除
- 上書きで元データが失われる可能性がある操作
- `reset`、`clean`、強制pushなどの不可逆操作
- パスワード、口座番号、マイナンバー、顧客個人情報などへのアクセスや保存
- Google Drive内の削除・移動

## 現在の残リスク

| リスク | 状態 | 対策 |
|---|---|---|
| チャット本文そのものは自動継承されない | 残る | `START_HERE.md`、`handoff.md`、`意思決定ログ.md` を正本にする |
| 端末間で最新状態がズレる | 残る | 端末をまたぐ時だけFetch/Pull/Pushを確認する |
| AlfとFayが同じファイルを同時編集する | 残る | Fayが担当・対象ファイルを台帳で分ける |
| スマホからローカル作業を直接できない | 残る | スマホは指示、Alfは実作業、Fayは司令塔に分ける |
| デスクトップPCがスリープする | 残る | Alf運用前に電源・スリープ・遠隔操作を確認する |
| GitHub認証が切れる | 低減済み | `gh auth status` で確認し、切れたら再認証する |
| 機密情報がGitHubに入る | 運用注意 | GitHubは台帳のみ、資料本体はGoogle Drive |
| 片方のチャットがいっぱいになる | 残る | `alf-restart-prompt.md` / `fay-restart-prompt.md` で相互復旧する |

## 結論

三神さんが毎回やることは、原則これだけ。

```text
Fay、START_HERE.mdから再開して。
```

それ以外の保存、整理、commit/push、Alf依頼文作成はFayが進める。
