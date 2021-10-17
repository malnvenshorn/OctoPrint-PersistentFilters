(function () {
    'use strict';

    class PersistentFiltersPlugin {
        constructor(dependencies) {
            [this.terminal] = dependencies;

            // TODO: Should be a static property once this is supported by eslint's parser
            this.storageKey = 'terminal.activeFilters';
        }

        // ViewModel callbacks

        onAfterBinding() {
            // Do nothing if localSorage is not available
            if (typeof localStorage === 'undefined') return;

            // Load value from localStorage if set
            const storedFilters = JSON.parse(localStorage.getItem(this.storageKey));
            if (storedFilters !== null) {
                // Delete removed filters
                const activeFilters = storedFilters.filter((regex) => (
                    this.terminal.filters().some((filter) => filter.regex === regex)
                ));
                localStorage.setItem(this.storageKey, JSON.stringify(activeFilters));

                // Apply filters
                this.terminal.activeFilters(activeFilters);
            }

            // Update localStorage on changes
            this.terminal.activeFilters.subscribe((newValue) => {
                localStorage.setItem(this.storageKey, JSON.stringify(newValue));
            });
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: PersistentFiltersPlugin,
        dependencies: [
            'terminalViewModel',
        ],
    });

})();
