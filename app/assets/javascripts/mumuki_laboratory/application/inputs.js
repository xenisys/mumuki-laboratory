(() => {
  // Declares a `document.ready` handler that will be
  // activated only when there is at least one element that match
  // the given selector
	mumuki.onInputsReady = (inputsSelector, callback) => {
		$(document).ready((event) => {
			if ($(inputsSelector).length === 0) return;

			callback(event);
		})
	}
})();
