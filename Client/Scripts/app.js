"use strict";
(function () {
    function confirmDelete() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
            }
        });
    }
    confirmDelete();
})();
//# sourceMappingURL=app.js.map