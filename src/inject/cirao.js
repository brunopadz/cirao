
(function ($) {

    var self = {
        ciraoImg: [
            'https://i0.wp.com/www.jornalopcao.com.br/wp-content/uploads/2018/08/ciro-gomes-9-1366x800.jpg',
            'https://cdnbr2.img.sputniknews.com/images/1201/44/12014489.jpg',
            'https://ichef.bbci.co.uk/news/660/cpsprodpb/1291B/production/_102795067_cirogomes.jpg',
            'https://images.immedia.com.br//29/29472_2_EL.jpg?c=201807251026',
            'https://www.24horasnews.com.br/imagem/resize/1110/550/imagens/2018/06/19/ciro-gomes-e-vaiado-e-deixa-evento-para-prefeitos-de-minas-gerais.jpg',
            'https://ogimg.infoglobo.com.br/in/21116826-aa0-806/FT1086A/652/ciro-gomes.jpg',
            'https://www.rbsdirect.com.br/imagesrc/24680812.jpg',
            'https://www.diariodocentrodomundo.com.br/wp-content/uploads/2016/06/Captura-de-Tela-2016-06-24-%C3%A0s-19.06.26.png',
            'https://i.imgur.com/uEkxLIM.jpg',
            'https://i.imgur.com/FtKI2Rv.jpg',
            'https://i.imgur.com/t3cvvwj.png',
            'https://i.imgur.com/dT8czFQ.jpg',
            'https://i.imgur.com/VxQL4pM.jpg',
            'https://i.imgur.com/5QKPsTa.jpg',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.ciraoImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
