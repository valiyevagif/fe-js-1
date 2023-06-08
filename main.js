let login = false;
let hasCredit = false;
let password;
let salary;
let currentDate = new Date();
let balance = 2500;
let creditOfferAmount;
let transactionHistory = [];

let savedPassword = password;

while (true) {
  if (!login) {
    let option = prompt("Əməliyyat növünü seçin:\n1.Daxil ol\n2.Qeydiyyat");

    if (option === "1") {
      do {
        savedPassword = prompt("Şifrənizi daxil edin:");
      } while (savedPassword === '');

      if (savedPassword === password) {
        login = true;
        alert("Sistemə giriş olundu!");
      } else {
        alert("Şifrə yanlış daxil olunmuşdur!");
      }
    } else if (option === "2") {
      do {
        password = prompt("Şifənizi daxil edin:");
      } while (password === '');

      do {
        salary = prompt("Maaşınızı daxil edin:");
      } while (salary === '');

      alert("Qeydiyyat uğurla tamamlandı!");
    } else {
      alert("Belə bir əməliyyat yoxdur!");
    }
  } else {
    while (true) {
      let atmOptions = prompt(
        "Əməliyyat növünü seçin:\n1.Balans göstər\n2.Pul çıxarmaq\n3.Kredit ödənişi"
      );

      if (atmOptions === "1") {
        alert("Balans: " + balance + "₼");
      }
      if (atmOptions === "2") {
        let withdrawAmount = prompt("Çıxaracağınız məbləği qeyd edin:");

        if (balance < withdrawAmount || balance <= 0) {
          let creditOffer = prompt("Balansınızda kifayət qədər vəsait yoxdur! Kredit götürmək istəyirsiniz?\n1.Bəli \n2.Xeyr");
          if (creditOffer === "1") {
            if (!hasCredit) {
              alert("Kredit əməliyyatı uğurla yerinə yetirildi!");
              creditOfferAmount = salary * 0.42;
              balance = balance + creditOfferAmount;
              hasCredit = true;
              transactionHistory.push({
                amount: creditOfferAmount,
                date: currentDate,
                type: "Kredit götürüldü",
              });
            } else {
              let loan = creditOfferAmount;
              alert("Sizin ödənilməmiş kredit borcunuz var!");
            }
          } else if (creditOffer === "2") {
            break;
          } else {
            alert("Belə bir əməliyyat yoxdur!");
          }
        } else {
          balance = balance - withdrawAmount;
        }
        transactionHistory.push({
          amount: withdrawAmount,
          date: currentDate,
          type: "Pul çıxarılıb",
        });

        let transactionAction = prompt("Əməliyyat növünü seçin:\n1.Davam etmək\n2.Əməliyyat tarixçəsini göstərmək");
        if (transactionAction === "1") {
          break;
        }
        if (transactionAction === "2") {
          const transactionList = transactionHistory.map((transaction) => {
            return `Məbləğ: ${transaction.amount}₼ | ${transaction.date} | (${transaction.type})`;
          });
          alert(transactionList.join("\n"));
        }
      }
      if (atmOptions === "3") {
        if (!hasCredit) {
          alert("Sizin kredit borcunuz yoxdur!");
        } else {
          let payCredit = prompt("Ödəyəcəyiniz məbləği daxil edin! Kredit borcunuz: " + creditOfferAmount + "₼");
          creditOfferAmount = creditOfferAmount - payCredit;
          alert("Ödəniş uğurla tamamlandı! Qalan kredit borcunuz: " + creditOfferAmount + "₼");
          if (creditOfferAmount <= 0) {
            alert("Bütün kredit borclarınız ödənildi!");
            hasCredit = false;
          }
          transactionHistory.push({
            amount: payCredit,
            date: currentDate,
            type: "Kredit ödənişi",
          });
        }
      }
    }
  }
}
