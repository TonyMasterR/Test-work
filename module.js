export default function run() {
  'use strict';

  function synchronize() {
      Object.keys($scope).map( (bindKey) => { /*a little trick to avoid inappropriate keys*/
        const value = $scope[bindKey];

        bindSet[bindKey].forEach((elem) => {
            (elem.tagName === 'INPUT') ?
                elem.value = value : elem.innerText = value;
        });

        delete $scope[bindKey];
      });
  }

  const $scope = {}; /*like in AngularJS*/
  const bindSet = {};

  let elemsToBind = document.querySelectorAll('[data-bind]');
  let applyBindings = document.getElementById('applyBindings');

  const elemsToBindArr = Array.from(elemsToBind);

  elemsToBindArr.forEach((elem) => { /* we could use for .. of on 'elemsToBind'*/
    const bindKey = elem.dataset.bind;

    if (!bindSet[bindKey]) bindSet[bindKey] = [];

        bindSet[bindKey].push(elem);
  });


  applyBindings.addEventListener('change', () => {
      if (applyBindings.checked) synchronize();
  });

  document.addEventListener('keyup', (e) => {
      const bindKey = e.target.dataset.bind;

      if (bindKey && bindSet[bindKey]) {
          $scope[bindKey] = e.target.value;

          if (applyBindings.checked) synchronize();
      }
  }, true); /* 'true' working faster cause of capturing stage*/
}
