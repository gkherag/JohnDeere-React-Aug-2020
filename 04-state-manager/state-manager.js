var StateManager = (function(){
    var _currentState = undefined,
        _callbacks = [],
        _reducer = undefined,
        _init_action = { type : '@@INIT/ACTION' };

    function getState(){
        return _currentState;
    }

    function subscribe(callback){
        _callbacks.push(callback);
    }

    function triggerChange(){
        _callbacks.forEach(callback => callback());
    }

    function dispatch(action){
        var newState = _reducer(_currentState, action);
        if (newState === _currentState) return;
        _currentState = newState;
        triggerChange();
    }

    function createStore(reducer){
        if (typeof reducer !== 'function')
            throw new Error('A reducer is mandatory to create the store');
        _reducer = reducer;
        //to initialize the currentState with the default valid state
        _currentState = _reducer(undefined, _init_action);
        var store = { getState, subscribe, dispatch };
        return store;
    }

    function bindActionCreators(actionCreators, dispatch) {
        var actionDispatchers = {};
        for (let key in actionCreators) {
            actionDispatchers[key] = function (...args) {
                const action = actionCreators[key](...args);
                dispatch(action);
            }
        }
        return actionDispatchers;
    }

    return { createStore, bindActionCreators };
})();