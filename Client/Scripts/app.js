"use strict";
(function () {
    function confirmDelete() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = '/survey-list';
            }
        });
    }
    confirmDelete();
})();
//# sourceMappingURL=app.js.map