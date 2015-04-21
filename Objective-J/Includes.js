/*
 * Includes.js
 * Objective-J
 *
 * Created by Francisco Tolmasky.
 * Copyright 2010, 280 North, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

#if DEBUG
#define DISPLAY_NAME(name) name.displayName = #name
#else
#define DISPLAY_NAME(name)
#endif

#define GLOBAL(name) name

#include "jsx.js"

#if COMMONJS

minify = (function() {
  #include "uglifyjs/utils.js"
  #include "uglifyjs/ast.js"
  #include "uglifyjs/parse.js"
  #include "uglifyjs/transform.js"
  #include "uglifyjs/scope.js"
  #include "uglifyjs/output.js"
  #include "uglifyjs/compress.js"
  #include "uglifyjs/sourcemap.js"
  #include "uglifyjs/mozilla-ast.js"
  #include "uglifyjs/propmangle.js"

  return function(code, options) {
    defaults(options, {
        spidermonkey : false,
        outSourceMap : null,
        sourceRoot   : null,
        inSourceMap  : null,
        fromString   : false,
        warnings     : false,
        mangle       : {},
        output       : null,
        compress     : {}
    });
    base54.reset();

    var toplevel = parse(code, {
        filename: "?",
        toplevel: toplevel
    });

    if (options.compress) {
        var compress = { warnings: options.warnings };
        merge(compress, options.compress);
        toplevel.figure_out_scope();
        var sq = Compressor(compress);
        toplevel = toplevel.transform(sq);
    }

    // 3. mangle
    if (options.mangle) {
        toplevel.figure_out_scope(options.mangle);
        toplevel.compute_char_frequency(options.mangle);
        toplevel.mangle_names(options.mangle);
    }

    var output = {};
    var stream = OutputStream(output);
    toplevel.print(stream);

    return stream + ""
  }
})();

#endif

#include "OldBrowserCompatibility.js"
#include "DebugOptions.js"
#include "json2.js"
#include "sprintf.js"
#include "CPLog.js"
#include "Constants.js"
#include "EventDispatcher.js"
#include "CFHTTPRequest.js"
#include "CFPropertyList.js"
#include "CFDictionary.js"
#include "CFData.js"
#include "CFURL.js"
#include "MarkedStream.js"
#include "CFBundle.js"
#include "StaticResource.js"
#include "Preprocessor.js"
#include "acorn.js"
#include "acornwalk.js"
#include "ObjJAcornCompiler.js"
#include "FileDependency.js"
#include "Executable.js"
#include "FileExecutable.js"
#include "Runtime.js"
#include "Eval.js"
#if defined(DEBUG) || defined(COMMONJS)
#include "Debug.js"
#endif
#include "Bootstrap.js"
