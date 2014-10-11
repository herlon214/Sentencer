var assert = require("assert");

var Sentencer = require('../index.js');

describe('Sentencer:', function() {

  it('should exist', function() {
    assert(Sentencer);
  });

  describe('Default', function() {

    describe('# Words', function() {

      it('should include a list of nouns', function() {
        assert(Sentencer._nouns.length);
      });

      it('should include a list of adjectives', function() {
        assert(Sentencer._adjectives.length);
      });

    });

    describe('# Actions', function() {

      it('should include `noun`', function() { assert(Sentencer.actions.noun); });
      it('should include `a_noun`', function() { assert(Sentencer.actions.a_noun); });
      it('should include `nouns`', function() { assert(Sentencer.actions.nouns); });
      it('should include `adjective`', function() { assert(Sentencer.actions.adjective); });
      it('should include `an_adjective`', function() { assert(Sentencer.actions.an_adjective); });

    });

  });

  describe('API', function() {

    it('should include a `configure` function', function() {
      assert(Sentencer.configure);
    });

    it('should merge a new action', function() {
      Sentencer.configure({
        actions: {
          firstNewAction: function() { return 'hello'; }
        }
      });

      assert.equal(Sentencer.actions.firstNewAction(), 'hello');
    });

    it('should accept another action merge later', function() {
      Sentencer.configure({
        actions: {
          secondNewAction: function() { return 'hello again'; }
        }
      });

      assert.equal(Sentencer.actions.firstNewAction(), 'hello', 'first action still exists');
      assert.equal(Sentencer.actions.secondNewAction(), 'hello again', 'second action exists as well');
    });

    it('should include a `make` function', function() {
      assert(Sentencer.make);
    });

  });

  describe('Templating', function() {

    describe('# Default Actions', function() {

      it('{{ noun }}', function(){  assert(Sentencer.make('{{ noun }}'));  });
      it('{{ a_noun }}', function(){  assert(Sentencer.make('{{ a_noun }}'));  });
      it('{{ nouns }}', function(){  assert(Sentencer.make('{{ nouns }}'));  });
      it('{{ adjective }}', function(){  assert(Sentencer.make('{{ adjective }}'));  });
      it('{{ an_adjective }}', function(){  assert(Sentencer.make('{{ an_adjective }}'));  });

    });

    describe('# Custom Actions', function() {

      it('{{ firstNewAction }}', function(){
        assert.equal(Sentencer.make('{{ firstNewAction }}'), 'hello');
      });

      it('{{ secondNewAction }}', function(){
        assert.equal(Sentencer.make('{{ secondNewAction }}'), 'hello again');
      });

    });

    describe('# Custom Actions With Arguments', function() {

      Sentencer.configure({
        actions: {
          withArgument: function(number) {
            return number;
          },
          withArguments: function() {
            return arguments.length;
          }
        }
      });

      it('should allow an action with one argument', function() {
        assert.equal( Sentencer.make('{{ withArgument(1) }}'), '1' );
      });

      it('should allow an action with multiple arguments', function() {
        assert.equal( Sentencer.make('{{ withArguments(1,2,3) }}'), '3' );
      });

    });

  });

});