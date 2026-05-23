# Alf依頼テスト

作成日: 2026-05-23

## 目的

FayからAlfへ仕事を依頼する形式が成立するかを確認する。

## 依頼文

```text
この作業はアルフで進めてください。

作業内容:

共通作業台の初回確認テストです。
AGENTS.md、handoff.md、projects.md、desktop-codex-prompt.md を読み、Alfとして作業を始められる状態か確認してください。

作業場所:

/Users/mikami/Documents/GitHub/mikami-operations-official

確認してほしいこと:

- 作業前に読むべきファイルが揃っているか
- 三神さん、Fay、Alfの役割が分かるか
- 作業後に handoff.md 更新、git status、commit、push まで行うルールが分かるか
- 不足しているファイルや不明点があるか

完了条件:

- 確認結果を短く報告する
- 不足や不明点があれば列挙する
- 実ファイルの削除・移動・不可逆操作はしない
- このテストではcommit/pushは実行しない

注意:

- 推測で大きな判断をしないでください。
- 削除や不可逆な操作は必ず確認してください。
```

## 期待する返答

- 「Alfとして作業開始できる / できない」
- 足りないもの
- 次に三神さんが実施する操作

## テスト結果

2026-05-23、サブエージェントで依頼フローを確認。

- Alfとして作業開始できる形式になっている。
- 実際のAlfへ渡すときは、作業場所 `/Users/mikami/Documents/GitHub/mikami-operations-official` を明記するとより安全。
- このテストではcommit/pushしない指定で問題なし。
