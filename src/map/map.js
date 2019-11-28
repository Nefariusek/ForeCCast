const map = {
    _c : "PL",
    _f : "false",
    set flag(value) {
        this._f = value;
    },
    get flag() {
        return this._f;
    },
    get country() {
        return this._c;
    },
    initMap(){
        $('#world-map').vectorMap({
        map: 'world_mill_en',
        onRegionClick: (event, code) => {
            this._f = true;
            this._c = code;
        },
    });
    },

}

export default map;