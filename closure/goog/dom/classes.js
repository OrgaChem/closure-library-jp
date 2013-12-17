// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview �N���X�̒ǉ��E�폜�E�ݒ���s�����[�e�B���e�B�ł��B
 * javascript�W����Element.classList����goog.dom.classlist {@link goog.dom.classlist}
 * �ɋ߂������̂��߁A���������� (���񕶎����͂���̂ł͂Ȃ��l�C�e�B�u���\�b�h�𗘗p���Ă��܂�)
 * ���R���p�C���̈��k���\�������Ȃ��Ă��܂��B
 *
 * Note: ���̃��[�e�B���e�B��HTMLElement�̑���������Ȃ����̂ł���A
 * ���̑��̃C���^�[�t�F�C�X�ł͓��삵�܂���B(��F SVGElements �ł͓��삵�܂���).
 *
 */


goog.provide('goog.dom.classes');

goog.require('goog.array');


/**
 * �N���X����element�v�f�ɃZ�b�g(�㏑��)���܂�
 * @param {Node} element �N���X���Z�b�g����DOM�m�[�h.
 * @param {string} className �K�p����N���X��(�����N���X��).
 */
goog.dom.classes.set = function(element, className) {
  element.className = className;
};


/**
 * �N���X���̃��X�g��Ԃ��܂�
 * @param {Node} element �N���X���擾����DOM�m�[�h.
 * @return {!Array} {@code element}�̃N���X��. 
 *     �u���E�U�ɂ����Array�ɓ��ʂȃv���p�e�B���ǉ�����邱�Ƃ��L��܂����A
 *     �����̃v���p�e�B�ɂ͈ˑ����܂���B
 */
goog.dom.classes.get = function(element) {
  var className = element.className;
  // Some types of elements don't have a className in IE (e.g. iframes).
  // Furthermore, in Firefox, className is not a string when the element is
  // an SVG element.
  return goog.isString(className) && className.match(/\S+/g) || [];
};


/**
 * �N���X(������)��element�v�f�ɒǉ����܂��B�N���X�����d�����ēo�^����邱�Ƃ͂���܂���B
 * @param {Node} �N���X��ǉ�����DOM�m�[�h.
 * @param {...string} �ǉ�����N���X(������).
 * @return {boolean} �N���X�����ׂĒǉ�������(�������͑��݂��Ă����)True��Ԃ��܂�.
 */
goog.dom.classes.add = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var expectedCount = classes.length + args.length;
  goog.dom.classes.add_(classes, args);
  goog.dom.classes.set(element, classes.join(' '));
  return classes.length == expectedCount;
};


/**
 * �N���X(������)��element�v�f����폜���܂��B
 * @param {Node} �N���X���폜����DOM�m�[�h.
 * @param {...string} �폜����N���X(������).
 * @return {boolean} {@code var_args}�̃N���X�����ׂđ��݂��A
 *     �폜�ł����True��Ԃ��܂��B
 */
goog.dom.classes.remove = function(element, var_args) {
  var classes = goog.dom.classes.get(element);
  var args = goog.array.slice(arguments, 1);
  var newClasses = goog.dom.classes.getDifference_(classes, args);
  goog.dom.classes.set(element, newClasses.join(' '));
  return newClasses.length == classes.length - args.length;
};


/**
 * {@link goog.dom.classes.add} �� {@link goog.dom.classes.addRemove}�̃w���p�[���\�b�h�ł��B
 * �N���X�z��ɂP�ȏ�̃N���X��ǉ����܂��B
 * @param {Array.<string>} classes element�v�f�̂��ׂẴN���X�����������N���X�z��B
 *     ���̈����� {@code args} ��ǉ����܂��B
 * @param {Array.<string>} args �ǉ�����N���X���̔z��
 * @private
 */
goog.dom.classes.add_ = function(classes, args) {
  for (var i = 0; i < args.length; i++) {
    if (!goog.array.contains(classes, args[i])) {
      classes.push(args[i]);
    }
  }
};


/**
 * {@link goog.dom.classes.remove} �� {@link goog.dom.classes.addRemove}�̃w���p�[���\�b�h�ł��B
 * 2�̔z��̍�����Ԃ��܂��B
 * @param {!Array.<string>} arr1 1�ڂ̔z��.
 * @param {!Array.<string>} arr2 2�ڂ̔z��.
 * @return {!Array.<string>} 1�ڂ̔z��̗v�f�̓��A�Q�ڂ̔z��ɖ���
 *     �v�f�̔z��B
 * @private
 */
goog.dom.classes.getDifference_ = function(arr1, arr2) {
  return goog.array.filter(arr1, function(item) {
    return !goog.array.contains(arr2, item);
  });
};


/**
 * �N���X�������ւ��܂��B����ւ��ΏۊO�̃N���X�͕ێ�����܂��B
 * fromClass���폜����Ȃ���΁AtoClass�͒ǉ�����܂���B
 * @param {Node} element �N���X�����ւ���Ώۂ�DOM�m�[�h.
 * @param {string} fromClass �폜����N���X��.
 * @param {string} toClass �ǉ�����N���X��.
 * @return {boolean} �N���X�����ւ��鎖���ł����True��Ԃ��܂��B
 */
goog.dom.classes.swap = function(element, fromClass, toClass) {
  var classes = goog.dom.classes.get(element);

  var removed = false;
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == fromClass) {
      goog.array.splice(classes, i--, 1);
      removed = true;
    }
  }

  if (removed) {
    classes.push(toClass);
    goog.dom.classes.set(element, classes.join(' '));
  }

  return removed;
};


/**
 * �N���X�̒ǉ��ƍ폜���P�x�ɍs���܂��B(�ǉ��E�폜�ǂ���̃N���X��0�ȏ�)
 * {@link goog.dom.classes.add} �� {@link goog.dom.classes.remove} ���ʂɌĂԂ��ƂƈقȂ�A 
 * 1�x�Ō����I�ɃN���X�̏����������s���܂��B
 *
 * ���������N���X���폜�E�ǉ��̗����̃��X�g�ɂ���ꍇ�A�N���X�͒ǉ�����܂��B
 * �]���āA���̃��\�b�h���g����{@link goog.dom.classes.swap} �̑����2�ȏ�̃N���X�����ւ��鎖���ł��܂��B
 * 
 *
 * @param {Node} element �N���X�����ւ���Ώۂ�DOM�m�[�h.
 * @param {?(string|Array.<string>)} classesToRemove �폜����N���X(������). null�ɂ���΃N���X�͍폜����܂���B
 * @param {?(string|Array.<string>)} classesToAdd �ǉ�����N���X(������). null�ɂ���΃N���X�͒ǉ�����܂���B
 */
goog.dom.classes.addRemove = function(element, classesToRemove, classesToAdd) {
  var classes = goog.dom.classes.get(element);
  if (goog.isString(classesToRemove)) {
    goog.array.remove(classes, classesToRemove);
  } else if (goog.isArray(classesToRemove)) {
    classes = goog.dom.classes.getDifference_(classes, classesToRemove);
  }

  if (goog.isString(classesToAdd) &&
      !goog.array.contains(classes, classesToAdd)) {
    classes.push(classesToAdd);
  } else if (goog.isArray(classesToAdd)) {
    goog.dom.classes.add_(classes, classesToAdd);
  }

  goog.dom.classes.set(element, classes.join(' '));
};


/**
 * element�v�f���N���X���������Ă��邩�ǂ�����Ԃ��܂��B
 * @param {Node} element �m�F�Ώۂ�DOM�m�[�h.
 * @param {string} className �m�F����N���X��.
 * @return {boolean} {@code element} �� {@code className} �������Ă����True��Ԃ��܂��B
 */
goog.dom.classes.has = function(element, className) {
  return goog.array.contains(goog.dom.classes.get(element), className);
};


/**
 * enabled�����ɏ]���ăN���X��ǉ��܂��͍폜���܂��B
 * @param {Node} element �ǉ��E�폜����Ώۂ�DOM�m�[�h.
 * @param {string} className �ǉ��E�폜����N���X��.
 * @param {boolean} enabled �ǉ����邩�A�폜���邩 (true �Œǉ�, false �ō폜).
 */
goog.dom.classes.enable = function(element, className, enabled) {
  if (enabled) {
    goog.dom.classes.add(element, className);
  } else {
    goog.dom.classes.remove(element, className);
  }
};


/**
 * elment���N���X�������Ă���΍폜���A�����ĂȂ���Βǉ����܂��B
 * ���̃N���X���ɂ͉e�����܂���B
 * @param {Node} element �N���X��؂�ւ���Ώۂ�DOM�m�[�h.
 * @param {string} className �؂�ւ���N���X.
 * @return {boolean} �ǉ����ꂽ��True, �폜���ꂽ��False��Ԃ��܂��B 
 *     (����������ƁA���̃��\�b�h���Ă񂾂��Ƃ�{@code element} �� {@code className}
 *      �������Ă��邩�ǂ�����Ԃ��܂��B).
 */
goog.dom.classes.toggle = function(element, className) {
  var add = !goog.dom.classes.has(element, className);
  goog.dom.classes.enable(element, className, add);
  return add;
};
