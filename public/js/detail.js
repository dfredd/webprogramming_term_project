console.log('detail 페이지입니다.')


document.addEventListener("DOMContentLoaded", () => {
    // 숫자를 3자리마다 콤마를 추가하는 유틸리티 함수
    const addCommas = (number) => number.toLocaleString();

    // DOM 요소 가져오기
    const [budgetElement, revenueElement] = document.querySelectorAll(".budget");

    // 텍스트에서 숫자 추출 및 변환
    const extractNumber = (element) =>
        parseInt(element.textContent.replace(/\D+/g, "") || "0", 10);

    const budget = extractNumber(budgetElement);
    const revenue = extractNumber(revenueElement);

    // 결과를 포맷팅하여 DOM에 반영
    if (!isNaN(budget)) {
        budgetElement.textContent = `예산: ${addCommas(budget)}`;
    }

    if (!isNaN(revenue)) {
        revenueElement.textContent = `수익: ${addCommas(revenue)}`;
    }
});
