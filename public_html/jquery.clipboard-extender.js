/**
 * JavaScript Clipboard Modifier
 * 
 * @author Matej Lednár
 * 
 * @param {Object} $ - jQuery
 * @returns {undefined}
 */
(function ($) {
    $.fn.clipboardExtender = function (data) {

        function copyAction(e) {
            
            var selectedText = document.getSelection().toString();
            var template = '<a href="' + data.url + '">' + selectedText + '</a>';
            var finalTemplate = "";
            var advertisement = "";

            var tempContainer = document.createElement("div");
            tempContainer.id = "copyToClipboardTemporaryContainer";

            document.body.appendChild(tempContainer);

            if (data.extendedText && data.extendedURL) {
                advertisement = '<a href="' + data.extendedURL + '">' + data.extendedText + '</a>';
            }

            if (data.extendedText && !data.extendedURL) {
                advertisement = data.extendedText;
            }

            finalTemplate += template + (data.separator ? data.separator : "") + advertisement;

            tempContainer.appendChild(domConstruct.toDom(finalTemplate));

            if (document.body.createTextRange) {

                var range = document.body.createTextRange();
                range.moveToElementText(tempURLContainer);
                range.select();

            } else {
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(tempURLContainer);
                selection.removeAllRanges();
                selection.addRange(range);
            }



            try {
                document.execCommand("copy");
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
            } finally {
                document.body.removeChild(tempURLContainer);
            }




        }
        // document.addEventListener("paste", pasteAction);
        document.addEventListener("copy", copyAction);

    };
}(jQuery));