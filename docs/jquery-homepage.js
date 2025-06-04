$(document).ready(function () {
    
    // Работа с переменными
    const siteName = "AituCritic";
    let visitCount = 1;
    let isLoggedIn = false;


    // Слайдер баннера
    let currentSlide = 0;
    const slides = $(".slide");
    function updateBannerSlide() {
        $(".slides").css("transform", "translateX(-" + (currentSlide * 100) + "%)");
        $(".banner-arrow.left").css("visibility", currentSlide === 0 ? "hidden" : "visible");
        $(".banner-arrow.right").css("visibility", currentSlide === slides.length - 1 ? "hidden" : "visible");
    }

    $(".banner-arrow.left").click(function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateBannerSlide();
        }
    });

    $(".banner-arrow.right").click(function () {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateBannerSlide();
        }
    });

    updateBannerSlide();

    // Прокрутка фильмов
    $(".movies-container").each(function () {
        const container = $(this);
        const grid = container.find(".movies-grid");

        container.find(".movies-arrow.left").click(function () {
            grid[0].scrollBy({
                left: -grid[0].clientWidth,
                behavior: "smooth"
            });
        });

        container.find(".movies-arrow.right").click(function () {
            grid[0].scrollBy({
                left: grid[0].clientWidth,
                behavior: "smooth"
            });
        });
    });

    // Кнопка добавления в Watchlist
    $(".watchlist-btn").click(function () {
        $(this).text("✓ Added to Watchlist").css("background-color", "#2ecc71");
    });
});
