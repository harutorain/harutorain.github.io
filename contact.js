document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // ページ遷移を防ぐ

  // ここで送信処理を行う（APIやメールサービス）

  // 確認メッセージを表示
  document.getElementById("confirmation").style.display = "block";

  // フォームリセット
  this.reset();
});
