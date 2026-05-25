# 永続worktree移行メモ

最終更新: 2026-05-25

## 結論

今後の秘書運用は、永続worktreeを使う方がよい。

理由は、Fay/Alf/Codex/Claude間の引き継ぎで必要になる `START_HERE.md`、`handoff.md`、`意思決定ログ.md`、`delegated-tasks.md` などを、毎回消えない作業場所に置けるため。

ただし、永続worktreeは「会話そのものを永久保存する記憶」ではない。正本になるのは、会話から要点を抽出して保存したMarkdownファイル群。つまり運用の本質は、これまで通り「重要なことをファイルに残す」こと。

## 推奨運用

### 推奨

`mikami-operations` などのGitリポジトリを正本にし、そのリポジトリからCodexの永続worktreeプロジェクトを作る。

永続worktreeプロジェクト名の候補:

- `秘書 - Permanent`
- `Fay Operations`
- `mikami-operations Fay`

### 役割分担

- 永続worktree: Fay/Alf/Codex/Claude間の共通作業台。引き継ぎファイルと作業ログの正本。
- Google Drive秘書ハブ: 資料、プロフィール、デイリーノート、プロジェクト関連資料の保管場所。
- この既存の秘書チャット: 移行完了までは暫定司令塔。移行後は必要に応じて参照。

## なぜ永続worktreeが向いているか

### 良い点

- チャットをまたいでも作業ファイルが残る。
- `START_HERE.md` を読めば、毎回長い引き継ぎ文を貼らずに再開できる。
- 複数スレッドを同じ永続worktreeから始められる。
- Git管理できるので、端末間やAlf/Fay間の同期に強い。
- commit/pushを使えば、ノートPC・デスクトップPC・スマホ経由の作業を一本化できる。

### 注意点

- この現在の `/Users/tomoya/Documents/Claude/Projects/<秘書>` はGitリポジトリではないため、そのままCodex worktree化する前提には合わない。
- 永続worktreeは、古い会話本文を自動で読んでくれる仕組みではない。
- 機密情報、口座番号、パスワード、マイナンバー、顧客個人情報などはGitHubや永続worktreeへ保存しない。
- Google Drive内の削除・移動、不可逆操作は必ず三神さん確認。

## 移行対象ファイル

新しい永続worktree側へ移す最小セット:

1. `AGENTS.md`
2. `START_HERE.md`
3. `00_プロフィール.md`
4. `handoff.md`
5. `projects.md`
6. `意思決定ログ.md`
7. `delegated-tasks.md`
8. `handoff-runbook.md`
9. `handoff-risk-register.md`
10. `alf-restart-prompt.md`
11. `fay-restart-prompt.md`
12. `desktop-codex-prompt.md`

必要に応じて移す補助ファイル:

1. `tool-inventory.md`
2. `tool-rebuild-plan.md`
3. `tool-development-summary.md`
4. `master-shipping-expansion-summary.md`
5. `alf-test-request.md`
6. `outputs/manual-20260524-fay-slides/presentations/handoff-guide/output/fay-alf-handoff-guide.pptx`

## これまでの経緯まとめ

### 秘書運用

- 三神さんの専属秘書役はFay/フェイ。
- 返答は簡潔に、結論から。
- 三神さんの入力は音声中心なので、確認は最小限にする。
- 不明点は推測せず、短く質問する。
- 会話開始時は、秘書ハブ、プロフィール、意思決定ログ、必要なプロジェクト情報を確認する。
- 決定事項、進捗、分割作業、次アクションは会話だけに残さずファイルへ保存する。

根拠ファイル:

- `AGENTS.md`
- `00_プロフィール.md`
- `START_HERE.md`
- `handoff.md`

### Fay / Alf 運用

- Fayは司令塔。
- AlfはデスクトップPC側の実作業・重い処理・ファイル生成・commit/push担当。
- ノートPC側はFay、デスクトップPC側はAlfとして扱う。
- 三神さんが「アルフでやって」「Alfで進めて」と言った場合、Fayが依頼内容を整理してAlfへ渡す。
- Alfの正式作業台は `/Users/mikami/Documents/GitHub/mikami-operations-official`。
- ノートPC側の作業台は `/Users/tomoya/Documents/GitHub/mikami-operations`。

根拠ファイル:

- `handoff.md`
- `delegated-tasks.md`
- `desktop-codex-prompt.md`

### GitHub共通作業台

- `mikami-operations` を共通作業台の正本にする方針。
- Google Driveは資料保管、GitHubは作業ログと引き継ぎ台帳。
- 毎回GitHub同期を必須にしない。
- 端末をまたぐとき、Alfがpushした後、FayがAlfへ渡す前、重要ファイル更新時は同期する。
- 安全な保存、台帳更新、commit、pushは毎回確認せず進めてよい。

根拠ファイル:

- `START_HERE.md`
- `handoff.md`
- `意思決定ログ.md`

### 引き継ぎ・再開方法

新チャットで三神さんが送る最小文:

```text
Fay、START_HERE.mdから再開して。
```

GitHub共通作業台から再開する場合:

```text
前の続き。mikami-operations の START_HERE.md から再開して。Fay/フェイとして、現在地と次アクションを確認して。
```

永続worktree移行後の推奨初回文:

```text
Fay、永続worktreeの START_HERE.md から再開して。必要ファイルを読んで、現在地と次アクションだけ短く確認して。
```

## 現在の主要プロジェクト

事業側:

- 融資相談
- 無線機カテゴリ販売戦略
- 関税・送料処理フロー改善
- 国内販売チャネル立ち上げ
- グループホーム事業

システム/ツール側:

- GitHub共通作業台 / Alf・Fay運用
- 引き継ぎ・オートセーブ運用
- マスターファイル / 既存出品ポリシー変更ツール
- リサーチサポートツール
- マスター送料体系 v2.0
- 業務ツール棚卸し・再構築
- ツール管理ダッシュボード

根拠ファイル:

- `projects.md`
- `delegated-tasks.md`
- `master-shipping-expansion-summary.md`
- `tool-inventory.md`
- `tool-rebuild-plan.md`

## 現在の最優先タスク

1. 永続worktreeを使うか最終決定する。
2. 使う場合は、`mikami-operations` をベースに永続worktreeプロジェクトを作る。
3. このファイルの「移行対象ファイル」を新しい正本へ反映する。
4. 新プロジェクトで `START_HERE.md` から再開できるかテストする。
5. Alf/Fay間のcommit/push運用を確認する。
6. マスター送料体系 v2.0 をマスタースプレッドシートへ反映する。
7. `FIND_CHEAPEST_CARRIER()` の動作確認をする。
8. リサーチサポートツールをマスター送料体系参照へ移行する。

## 新プロジェクト作成後の初期プロンプト

```text
Fayとして再開してください。

このプロジェクトは、三神知也さんの秘書運用の正本です。
まず START_HERE.md を読み、その順番で必要ファイルを確認してください。

返答は簡潔に、結論から。
重要な判断は根拠ファイル名を添えてください。
三神さんの入力は音声中心なので、確認は最小限にしてください。

読み込み後は、現在地・最優先タスク・未決事項だけを短くまとめて、
最後に「本日のご用件をどうぞ」と促してください。
```

## 移行完了条件

- 永続worktree側で `START_HERE.md` から再開できる。
- `handoff.md` に現在地と次アクションがある。
- `意思決定ログ.md` に永続worktree採用判断が残っている。
- `delegated-tasks.md` に移行タスクが登録されている。
- 重要ファイルがGitHubへcommit/pushされている。
- 旧秘書チャットに依存せず、新プロジェクトだけでFayとして再開できる。

## 運用判断

今後は、既存の秘書チャットに新しい情報を積み増すより、永続worktree側を正本にする方がよい。

理由:

- 現在の秘書チャットはチャット文脈とローカルフォルダに依存している。
- 永続worktreeは新規スレッドをまたいでも作業場所が残る。
- GitHub共通作業台方針と相性がよい。
- Fay/Alf間でファイルを正本にする運用と一致する。

ただし、移行後も「会話中の重要事項は保存する」運用は続ける。永続worktreeは引き継ぎ作業を減らすが、保存作業そのものを不要にはしない。
