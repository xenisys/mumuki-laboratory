mumuki.load(function () {

  mumuki.resize(function () {
    var margin = 15;
    var fullMargin = margin * 2;

    var gbsBoard = $('[class^="mu-kids-gbs-board"]');
    gbsBoard.each(function (i) {
      gsBoardScale($(gbsBoard[i]));
    });

    var $muKidsBlocks = $('.mu-kids-blocks');
    var $blockArea = $muKidsBlocks.find('#blocklyDiv');
    var $blockSvg = $muKidsBlocks.find('.blocklySvg');

    $blockArea.width($muKidsBlocks.width());
    $blockArea.height($muKidsBlocks.height());

    $blockSvg.width($muKidsBlocks.width());
    $blockSvg.height($muKidsBlocks.height());

    function gsBoardScale($element) {
      var $table = $element.find('gs-board > table');
      $table.css('transform', 'scale(1)');
      var scaleX = ($element.width() - fullMargin) / $table.width();
      var scaleY = ($element.height() - fullMargin) / $table.height();
      $table.css('transform', 'scale(' + Math.min(scaleX, scaleY) + ')');
    }

  });

  var currentParagraphIndex = 0;
  var $speechParagraphs = $('.mu-kids-character-speech-bubble > p');
  var $prevSpeech = $('.mu-kids-character-speech-bubble > .mu-kids-prev-speech').hide();
  var $nextSpeech = $('.mu-kids-character-speech-bubble > .mu-kids-next-speech');

  $nextSpeech.click(function () {
    hideCurrentParagraph();
    showNextParagraph();
  });
  $prevSpeech.click(function () {
    hideCurrentParagraph();
    showPrevParagraph();
  });

  function hideCurrentParagraph() {
    $($speechParagraphs[currentParagraphIndex]).hide();
  }

  function showPrevParagraph() {
    $nextSpeech.show();
    $($speechParagraphs[--currentParagraphIndex]).show();
    if (currentParagraphIndex === 0) $prevSpeech.hide();
  }

  function showNextParagraph() {
    $prevSpeech.show();
    $($speechParagraphs[++currentParagraphIndex]).show();
    if ($speechParagraphs.length - 1 === currentParagraphIndex) $nextSpeech.hide();
  }
});
