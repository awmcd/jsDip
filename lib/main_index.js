require(["adjudicator/App", "init/init_state"], function(adjudicator, new_game) {
    window.adjudicator = adjudicator;
    window.new_game = new_game;
    
    var order_list = adjudicator.util.inputOrders(['A Con-Bul', 'F Ank-Arm', 'A Smy-Gre', 'A Bud S A Tri-Ser', 'A Tri-Tyr', 'A Ber S A Mun', 'A Mun-Gre']);
    var output = adjudicator.submit(new_game, order_list);
    console.log('output: ', output);
});