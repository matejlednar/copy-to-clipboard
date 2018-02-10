/**
 * JavaScript Clipboard Extender
 * 
 * How to use it
 *      - copy text to MS Word
 * 
 * @author Matej Lednár
 * 
 * @param data {Object} 
 *             {
 *                 url: {String},
 *                 extendedText : {String},
 *                 extendedURL : {String},
 *                 separator : {String},
 *                 mainStyle : {String},
 *                 extendedStyle : {String}
 *             }
 * @returns {undefined}
 */
(function ($) {
    $.fn.clipboardExtender = function (data) {
        var active = false;

        function copyAction(e) {

            if (active) {
                active = false;
                return;
            }

            var mainStyle = data.mainStyle ? "style='" + data.mainStyle + "'" : "";
            var extendedStyle = data.extendedStyle ? "style='" + data.extendedStyle + "'" : "";
            var selectedText = document.getSelection().toString();
            var template = "";
            if (data.url) {
                template = '<a ' + mainStyle + ' href="' + data.url + '">' + selectedText + '</a>';
            }
            else {
                template = selectedText;
            }
            var finalTemplate = "";
            var advertisement = "";

            // creating virtual container
            var tempContainer = document.createElement("div");
            tempContainer.id = "copyToClipboardTemporaryContainer";

            document.body.appendChild(tempContainer);

            if (data.extendedText && data.extendedURL) {
                advertisement = '<a ' + extendedStyle + ' href="' + data.extendedURL + '">' + data.extendedText + '</a>';
            }

            if (data.extendedText && !data.extendedURL) {
                advertisement = data.extendedText;
            }

            finalTemplate += template + (data.separator ? data.separator : "") + advertisement;

            // tempContainer.appendChild($.parseHTML(finalTemplate));
            $(tempContainer).append($.parseHTML(finalTemplate));
            document.getSelection().removeAllRanges();

            if (document.body.createTextRange) {

                var range = document.body.createTextRange();
                range.moveToElementText(tempContainer);
                range.select();

            } else {
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(tempContainer);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            try {
                active = true;
                document.execCommand("copy");
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
            } finally {
                document.body.removeChild(tempContainer);
            }

        }
        // document.addEventListener("paste", pasteAction);
        document.addEventListener("copy", copyAction);

    };
}(jQuery));