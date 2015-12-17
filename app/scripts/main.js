angular.module('myapp', [])
  .controller('MainCtrl', function($scope, $document, $timeout, $rootScope){
    var counter = 0;
    $scope.texts = [];
    $scope.edit = true;
    $scope.view = 'compose';
    var $markdown = $('#markdown');

    $scope.compose = {
      title: '',
      content: '',
      mode: 'new'
    };

    function addSlide(title, content) {
        counter++;
        var len = $scope.texts.push({
          id: counter,
          title: title,
          content: content,
          selected: false
        });
        return $scope.texts[len - 1];
    };

    function updateSlide(id, title, content) {
      var items = $scope.texts;
      items.filter(function(itm) {
        return itm.id === id;
      }).forEach(function(item){
        item.title = title;
        item.content = content;
      });
    }

    function removeSlide(item) {
      var idx = $scope.texts.indexOf(item);
      if(idx === -1) return;
      $scope.texts.splice(idx, 1);
      $scope.selected = null;
    }

    function select(item) {
      $scope.texts.forEach(function(i){
        if(i === item) {
          i.selected = true;
        }
        else {
          i.selected = false;
        }
      });
    }

    $scope.add = function() {
      var title = 'Slide ' + (counter + 1);
      $scope.selected = addSlide(title, '');
    };

    var showTyped = function() {
      $('#preview').typed({
        strings: $scope.texts.map(function(txt){ return markdown.toHTML(txt.content); }),
        typeSpeed: 0,
        contentType: 'html'
      });
    };

    $scope.run = function() {
      $scope.edit = false;
      $document.bind('keyup', function(evt){
        if(evt.keyCode === 27) {
          $scope.edit = true;
          $document.unbind('keyup');
          $scope.$apply();
        }
      });
    };

    $scope.initTyped = function() {
      labelWatchUnbind();
      showTyped();
    };

    $scope.selected = null;

    $scope.load = function(itm) {
      $scope.selected = itm;
      $scope.compose.view = 'compose';
    };

    $scope.remove = removeSlide;

    $scope.processKeydown = function(e) {
      if(e.keyCode === 9) {
        var txt = e.target;
        var val = txt.value,
          start = txt.selectionStart,
          end = txt.selectionEnd;
        // if(val.length) {
        //   txt.value = val.substring(0, start)
        //     + '\t'
        //     + val.substring(end);
        // }
        // else {
        //   txt.value = '\n\t';
        // }

        txt.value = val.substring(0, start)
          + '\t'
          + val.substring(end);

        // txt.focus();
        txt.selectionStart = txt.selectionEnd = start + 1;
        e.preventDefault();
      }
    };

    $scope.switch = function(vw) {
      $scope.view = vw;
      if (vw === 'view') {
        setTimeout(function(){
          $('.md').html(markdown.toHTML($scope.selected.content));
        });
      }
    };
    // $scope.label = 'Show Title';
    // $scope.$watch('label', function(){
    //   console.log('foo', arguments);
    //   $rootScope.title = $scope.label;
    //
    // });

    var labelWatchUnbind;
    $scope.onEdit = function() {
      // console.log('Edit',$scope.$id, $scope.label);
      // labelWatch = $scope.$watch('label', function(newVal){
      //   console.log('Watch:', newVal);
      // });
      // console.log($scope);
      $scope.$$childHead.label = 'Show Unnamed'
      labelWatchUnbind = $scope.$watch(function(){
        return $scope.$$childHead.label;
      }, function(newVal){
        // console.log('Watch:', newVal);
        $rootScope.title = newVal;
      });
    };
  });
