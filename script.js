
function init() {
    var point = "Старый Оскол, микрорайон Конева 15 А"
    var myMap = new ymaps.Map('map', {
        center: [51.31059486, 37.87972794],
        zoom: 15
        });
    var location = ymaps.geolocation.get();
    location.then(function (res) {
        var userTextLocation = res.geoObjects.get(0).properties.get('text');
        var multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [ 
                userTextLocation,
                [51.31086383, 37.88036630],
                point
            ],
            params: {
                routingMode: 'pedestrian'
            }
        }, {
            boundsAutoApply: true
        });
        myMap.geoObjects.add(multiRoute);
        // loc(myMap)
    });
}

ymaps.ready(init);
// while (true){
//     setTimeout(function(){
//         geolocation.get({
//         provider: 'yandex',
//         mapStateAutoApply: true
//         }).then(function (result) {
//             // Красным цветом пометим положение, вычисленное через ip.
//             result.geoObjects.options.set('preset', 'islands#redCircleIcon');
//             result.geoObjects.get(0).properties.set({
//                 balloonContentBody: 'Мое местоположение'
//             });
//         myMap.geoObjects.add(result.geoObjects);
//         });
//     }, 60000)
// }