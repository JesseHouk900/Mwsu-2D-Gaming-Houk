var boot = {
    
    preload: function () {
        console.log('boot')
        game.load.image('load_bar', 'assets/images/loading_border.png')
        game.load.image('progress', 'assets/images/loading_interior.png')
    },

    create: function () {
        
        if (this.isDeviceMobile()) {
            console.log('on device')
            //this.scale.minWidth = window.outerWidth
            //this.scale.minHeight = window.outerHeight
            this.scale.maxWidth = window.outerWidth
            this.scale.maxHeight = window.outerHeight
            this.scale.minWidth = window.innerWidth
            this.scale.minHeight = window.innerHeight
            //this.scale.maxWidth = window.outerWidth
            //this.scale.maxHeight = window.outerHeight
        }
        else {
            console.log('on comp')
            
            this.scale.minWidth = config.minWidth
            this.scale.minHeight = config.minHeight
            this.scale.maxWidth = config.maxWidth
            this.scale.maxHeight = config.maxHeight
        }

        this.scale.pageAlignHorizontally = true
        this.scale.pageAlignVertically = true
        this.scale.setScreenSize = true
        game.state.start("preload")
    },

    isDeviceMobile: function () {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i)
            },

            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i)
            },

            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i)
            },

            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i)
            },

            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
            }
        }
        return isMobile.any()
    }
}