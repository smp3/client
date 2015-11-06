smp3App.service('ConfigService', ['store', function (store) {
        
        this.addExcemptUrl = function (url) {
            config = store.get('config');
            if(!config.excempt_urls) {
                config.excempt_urls = [];
            }
            if (config.excempt_urls.indexOf(url) === -1) {
                config.excempt_urls.push(url);
            }
            store.set('config', config);
        };

       

    }]);

