/**
 * FireTPL compiler node module
 *
 * Usage:
 * var fireTPLCompiler = new FireTPL.Compiler();
 * var precompiled = fireTPLCompiler.precompile('./views/template.ftl');
 *
 * @module FireTPL.Compiler
 */
module.exports = function(FireTPL) {
    'use strict';

    var Compiler = function(options) {
        options = options || {};
        
        /**
         * Set the log level.
         * 
         * Levels are:
         *
         * 4 DEBUG
         * 3 INFO
         * 2 WARN
         * 1 ERROR
         * @type {Number}
         */
        this.logLevel = 1;
    };

    /**
     * Precompiles a template string
     *
     * @method precompile
     * @param {String} tmpl Tmpl source
     * @param {Object} options Precompile options
     * 
     *
     * @return {Function} Returns a parsed tmpl source as a function.
     */
    Compiler.prototype.precompile = function(tmpl, options) {
        options = options || {};

        if (!options.name) {
            console.error('Precompilation not possible! The options.name flag must be set!');
            return;
        }

        options.firetplModule = options.firetplModule || 'firetpl';

        var tplName = options.name;

        var parser = new FireTPL.Parser({
            type: options.type || 'fire'
        });
        
        parser.parse(tmpl);
        var precompiled = parser.flush();

        if (options.verbose) {
            console.log('\n---------- begin of precompiled file ----------\n');
            console.log(precompiled);
            console.log('\n----------- end of precompiled file -----------\n');
            console.log('size: ', precompiled.length, 'chars\n');
        }

        var output = '';
        if (options.commonjs) {
            output += ';(function(require) {var FireTPL = require(\'' + options.firetplModule + '\');';
        }
        else if (options.amd) {
            output += 'define(' + (options.moduleName ? '\'' + options.moduleName + '\',' : '') + '[\'' + options.firetplModule + '\'],function(FireTPL) {';
        }
        else if (options.scope) {
            output = ';(function(FireTPL) {';
        }

        output += 'FireTPL.templateCache[\'' + tplName + '\']=function(data,scopes) {var h=new FireTPL.Runtime(),l=FireTPL.locale,f=FireTPL.fn;' + precompiled + 'return s;};';

        if (options.commonjs) {
            output += '})(require);';
        }
        else if(options.amd) {
            output += '});';
        }
        else if (options.scope) {
            output += '})(FireTPL);';
        }

        return output;
    };

    /* +---------- FireTPL methods ---------- */

    FireTPL.precompile = function(tmpl, options) {
        var compiler = new FireTPL.Compiler(tmpl, options);
        return precompile;
    };

    FireTPL.fire2html = function(tmpl, data) {
        data = data || {};

        var template = FireTPL.compile(tmpl);
        return template(data);
    };

    return Compiler;
};