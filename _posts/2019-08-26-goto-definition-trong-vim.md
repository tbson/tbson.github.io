---
layout: post
title: Goto definition trong Vim
subtitle: Goto definition trong Vim dùng ctags cho dự án dùng JS ES6.
---

Vim (Neovim) là một text editor, không phải là 1 IDE nên không hỗ trợ việc index source code.

Goto definition trong vim chỉ được hỗ trợ trong từng file hoặc buffer, việc nhảy tới 1 file khác phải phụ thuộc vào 1 tool bên ngoài, tool đó là `ctags`

Nhưng ctags có 1 vấn đề là: đây là 1 tool khá cũ và ít được cập nhật nên mặc định nó sẽ bỏ sót rất nhiều keywords trong các file js có dùng các cấu trúc hiện đại như Class.

Để khắc phục điều đó, cộng đồng mã nguồn mở có vài dự án để khắc phục: dùng regex trong file `.ctags` ví dụ như repo (romainl/ctags-patterns-for-javascript)[https://github.com/romainl/ctags-patterns-for-javascript]

Ý tưởng của repo này rất đơn giản: cung cấp 1 loạt regex để `ctags` thông minh hơn trong việc index các file js hiện đại.

Các bạn có thể làm theo hướng dẫn ở repo trên hoặc đơn giản hơn là copy nội dung sau vào file `~/.ctags`

```
--langmap=javascript:.js.es6.es.jsx
--javascript-kinds=-c-f-m-p-v

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*\[/\1/A,Array,Arrays/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*\[/\1/A,Array,Arrays/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*\[/\1/A,Array,Arrays/b

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function/\1/C,Class,Classes/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function/\1/C,Class,Classes/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function/\1/C,Class,Classes/b
--regex-javascript=/^[ \t]*class[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/C,Class,Classes/b

--regex-javascript=/^[ \t]*export[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\5/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\7/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}function[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b

--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\5/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}\({[ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\7/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}function[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)/\1/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b
--regex-javascript=/^[ \t]*export[ \t]\{1,\}default[ \t]\{1,\}const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[^,]\{1,\},[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/E,Export,Exports/b

--regex-javascript=/^[ \t]*function[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t(]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*[(]function[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t(]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*async[ \t]function[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t(]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*[(]async[ \t]function[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t(]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function[^\*][^\*]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function[^\*][^\*]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function[^\*][^\*]/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*([^)]*$/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*([^)]*$/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*([^)]*$/\1/F,Function,Functions/b

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[^=]*=>/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[^=]*=>/\1/F,Function,Functions/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[^=]*[ \t]*=>/\1/F,Function,Functions/b

--regex-javascript=/^[ \t]*function[ \t]*\*[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\1/G,Generator,Generators/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function\([ \t]*\*\)/\1/G,Generator,Generators/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function\([ \t]*\*\)/\1/G,Generator,Generators/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([a-z][A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function\([ \t]*\*\)/\1/G,Generator,Generators/b
--regex-javascript=/^[ \t]*\(\*[ \t]\)\([A-Za-z0-9_$]\{1,\}\)[ \t]*(.*)[ \t]*[{]/\2/G,Generator,Generators/b

--regex-javascript=/^[ \t]*import[ \t]\{1,\}\([{][ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\3/I,Import,Imports/b
--regex-javascript=/^[ \t]*import[ \t]\{1,\}\([{][ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\5/I,Import,Imports/b
--regex-javascript=/^[ \t]*import[ \t]\{1,\}\([{][ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)*\([A-Za-z0-9_]\{1,\}\),[ \t]*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\7/I,Import,Imports/b

--regex-javascript=/^[ \t]*import[ \t]\{1,\}type[ \t]\{1,\}\([{][ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\3/I,Import,Imports/b
--regex-javascript=/^[ \t]*import[ \t]\{1,\}typeof[ \t]\{1,\}\([{][ \t]*\)*\([A-Za-z0-9_\*]*[ \t]as[ \t]\)\([A-Za-z0-9_]\{1,\}\)/\3/I,Import,Imports/b

--regex-javascript=/^[ \t]*this\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*=.*[{]$/\1/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function/\2/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*(/\2/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*function/\3/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*(/\3/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*[:=][ \t]*[(]*function[ \t]*(/\1/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*[:=][ \t](\{1,\}/\1/M,Method,Methods/b
--regex-javascript=/^[ \t]*static[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*(/\1/M,Method,Methods/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)(.*)[ \t]*[{]/\1/M,Method,Methods/b

--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)\.\([A-Za-z0-9_$]\{1,\}\)[ \t]*[=][ \t]*{/\2/P,Property,Properties/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*:[ \t]*[{"\/\[]/\1/P,Property,Properties/b
--regex-javascript=/^[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*:[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t,]*$/\1/P,Property,Properties/b

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[{]/\1/O,Object,Objects/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[{]/\1/O,Object,Objects/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[{]/\1/O,Object,Objects/b

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*styled/\1/S,StyledComponent,StyledComponents/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*styled/\1/S,StyledComponent,StyledComponents/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*styled/\1/S,StyledComponent,StyledComponents/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*createGlobalStyle/\1/S,StyledComponent,StyledComponents/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*createGlobalStyle/\1/S,StyledComponent,StyledComponents/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*createGlobalStyle/\1/S,StyledComponent,StyledComponents/b

--regex-javascript=/\/\/[ \t]*\(FIXME\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(TODO\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(BUG\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(NOBUG\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(???\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(!!!\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(HACK\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b
--regex-javascript=/\/\/[ \t]*\(XXX\)[ \t]*:*\(.*\)/\1/T,Tag,Tags/b

--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[0-9\"'\/]/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[0-9\"'\/]/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*[0-9\"'\/]/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*new/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*new/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*const[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*=[ \t]*new/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[,;]/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*[,;]/\1/V,Variable,Variables/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/V,Variable,Variables/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\2/V,Variable,Variables/b
--regex-javascript=/^[ \t]*var[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/V,Variable,Variables/b
--regex-javascript=/^[ \t]*let[ \t]\{1,\}\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)[ \t]*,[ \t]*\([A-Za-z0-9_$]\{1,\}\)/\3/V,Variable,Variables/b

--exclude=min
--exclude=vendor
--exclude=*.min.*
--exclude=.map
--exclude=.swp
--exclude=.bak
--exclude=tags
--exclude=node_modules
--exclude=bower_components
--exclude=test
--exclude=tests
--exclude=*.spec.*
--exclude=*.stories.*
```

Sau đó vào folder chính của source code và chạy:

```
ctags -R .
```

Lệnh này sẽ tạo ra 1 file tên là `tag` ở cùng thư mục

File này sẽ có nội dung dạng này:

```
popMessage	client/src/utils/helpers/Tools.js	/^    static popMessage(description: string | Object, type: string = 'success'): void {$/;"
```

Phần đầu tiên là tên function/variable, phần tiếp theo là tên file mà function đó được định nghĩa, phần cuối là preview.

Để tới nơi định nghĩa: Dùng tổ hợp phím `Ctrl + ]`
Để quay về: Dùng tổ hợp phím `Ctrl + o`

Demo:

![ctags](/img/posts/2019-08-26/ctags.gif)

DONE
