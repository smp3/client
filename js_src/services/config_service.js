smp3App.service('ConfigService', ['store', function (store) {
        
        this.addExcemptUrl = function (url) {
            configuration = store.get('config');
            if(!configuration.excempt_urls) {
                configuration.excempt_urls = [];
            }
            if (configuration.excempt_urls.indexOf(url) === -1) {
                configuration.excempt_urls.push(url);
            }
            store.set('configuration', configuration);
        };

       

    }]);

