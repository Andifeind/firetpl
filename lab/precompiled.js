(function(FireTPL) {
    FireTPL.templateCache['test'] = function(data, scopes) {
        var h = new FireTPL.Runtime(),
            l = FireTPL.locale,
            f = FireTPL.fn;
        scopes = scopes || {};
        var root = data,
            parent = data;
        scopes.scope004 = function(data, parent) {
            var s = '';
            s += h.exec('each', data, parent, root, function(data) {
                var s = '';
                s += '<li class="comment"><span class="user">' + data.user + '</span><span class="comment">' + data.comment + '</span></li>';
                return s;
            });
            return s;
        };
        scopes.scope003 = function(data, parent) {
            var s = '';
            var c = data;
            var r = h.exec('if', c, parent, root, function(data) {
                var s = '';
                s += '<ul>';
                s += scopes.scope004(data.comments, data);
                s += '</ul>';
                return s;
            });
            s += r;
            if (!r) {
                s += h.exec('else', c, parent, root, function(data) {
                    var s = '';
                    s += '<div class="noComments">No comments available yet</div>';
                    return s;
                });
            }
            return s;
        };
        scopes.scope002 = function(data, parent) {
            var s = '';
            s += h.exec('each', data, parent, root, function(data) {
                var s = '';
                s += '<li class="tag">' + data.tag + '</li>';
                return s;
            });
            return s;
        };
        scopes.scope001 = function(data, parent) {
            var s = '';
            s += h.exec('each', data, parent, root, function(data) {
                var s = '';
                s += '<li><span class="index">' + data.index + '</span><span class="title">' + data.title + '</span><span class="tags"><ul class="tags">';
                s += scopes.scope002(data.tags, data);
                s += '</ul></span></li>';
                return s;
            });
            return s;
        };
        var s = '';
        s += '<section class="test"><h1><span class="firetpl-scope" data-path="title">' + data.title + '</span></h1><div class="listing"><ul>';
        s += scopes.scope001(data.listing, data);
        s += '</ul></div><div class="comments">';
        s += scopes.scope003(data.comments, data);
        s += '</div></section>';
        return s;
    };
})(FireTPL);
