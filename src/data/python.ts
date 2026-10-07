import type { LanguagePack } from './types'

export const python: LanguagePack = {
  id: 'python',
  name: 'Python',
  zhName: 'Python',
  color: '#3776ab',
  gradient: 'from-sky-500 to-blue-600',
  icon: '🐍',
  tagline: '人生苦短，我用 Python',
  description: '语法简洁、生态繁荣的解释型语言，数据分析、人工智能与自动化脚本的首选。',
  playgroundTemplate: `print("Hello, CodeMatrix!")

total = 0
for i in range(1, 101):
    total += i
print("1+2+...+100 =", total)

# 列表推导式
squares = [x * x for x in range(1, 6)]
print("平方数:", squares)`,
  chapters: [
    {
      id: 'py-ch1',
      title: '第 1 章 Python 入门',
      intro: '解释型语言的运行机制、缩进规则与第一个程序。',
      sections: [
        {
          title: '1.1 Python 的特点与运行机制',
          content: [
            'Python 是解释型、动态类型、强类型的语言：源码由解释器逐行执行，无需显式编译；变量类型在运行时确定；不允许隐式的危险类型转换（如 "1" + 1 会报 TypeError）。',
            'Python 用缩进表示代码块（通常 4 个空格），而不是大括号。同一个代码块必须保持相同的缩进量，混用 Tab 与空格是新手最常见的错误（IndentationError）。',
            '注释：单行用 #，多行用三引号字符串（实际是多行字符串充当注释）。文件头部常写 # -*- coding: utf-8 -*- 声明编码（Python 3 默认 UTF-8，可不写）。',
            'Python 之禅（import this）：简单优于复杂、明确优于隐晦、可读性很重要——这是 Python 代码风格的哲学基础。',
          ],
          code: {
            lang: 'python',
            caption: '第一个 Python 程序',
            source: `# 这是注释
print("Hello, World!")  # 行尾注释

if True:
    print("缩进即代码块")  # 注意 4 空格缩进`,
          },
        },
        {
          title: '1.2 交互模式与脚本模式',
          content: [
            '交互模式（REPL）：在命令行输入 python 进入 >>> 提示符，输入一行立即执行一行，适合做实验与验证想法。',
            '脚本模式：把代码保存为 .py 文件，用 python 文件名.py 整体执行，是正式开发的方式。IDE（PyCharm、VSCode）本质是帮你组织脚本并一键运行。',
            'print() 默认换行，可用 end="" 取消；sep 参数控制多个值之间的分隔符：print(1, 2, 3, sep="-") 输出 1-2-3。',
            'input() 读取一行输入，返回值永远是字符串！要算术运算必须 int(input()) 或 float(input()) 转换——忘记转换是入门第一坑。',
          ],
        },
        {
          title: '1.3 关键字与标识符',
          content: [
            'Python 3 有 35 个关键字：if、else、elif、for、while、def、class、return、import、from、as、try、except、finally、raise、with、lambda、global、nonlocal、pass、break、continue、and、or、not、in、is、None、True、False、del、assert、yield、async、await。',
            '标识符规则：字母/数字/下划线组成，不能以数字开头，区分大小写，不能用关键字。命名规范（PEP8）：变量与函数用蛇形 user_name，类名用大驼峰 UserName，常量全大写 MAX_SIZE。',
            'pass 是空语句占位符：还没想好写什么时防止语法报错，如 def todo(): pass。',
          ],
        },
      ],
      quiz: [
        {
          question: 'Python 划分代码块依靠的是？',
          options: ['A. 大括号 {}', 'B. 缩进', 'C. 分号', 'D. begin/end'],
          answer: 'B',
          explanation: 'Python 用缩进（通常 4 空格）表示代码块层级，这是它最鲜明的语法特征。',
        },
        {
          question: 'input() 函数返回值的类型是 ______。',
          answer: 'str（字符串）',
          explanation: '无论输入什么，input 都返回字符串；要参与算术运算必须用 int() 或 float() 转换。',
        },
        {
          question: 'print(1, 2, 3, sep="*", end="!") 的输出是？',
          options: ['A. 1 2 3!', 'B. 1*2*3!', 'C. 1*2*3', 'D. 123!'],
          answer: 'B',
          explanation: 'sep 控制元素间分隔符为 *，end 把结尾的换行替换成 !。',
        },
      ],
    },
    {
      id: 'py-ch2',
      title: '第 2 章 变量与数据类型',
      intro: '动态类型、数字、字符串、布尔与类型转换。',
      sections: [
        {
          title: '2.1 变量与动态类型',
          content: [
            'Python 变量不需要声明类型，赋值即创建：x = 10。变量本质是"名字标签"，可以先后指向不同类型的对象：x = 10 之后 x = "hello" 完全合法。',
            '赋值即引用：a = [1,2]; b = a 后 b 与 a 指向同一个列表，改 b 会影响 a。需要独立副本时用 b = a.copy() 或 b = a[:]。',
            '多重赋值：a, b = 1, 2；交换变量直接写 a, b = b, a，无需临时变量——这是 Python 的标志性写法（本质是元组打包与解包）。',
            'type(x) 查看类型；isinstance(x, int) 判断类型（推荐，支持继承）；id(x) 查看对象地址。小整数缓存：-5~256 的整数是同一个对象，a = 256; b = 256; a is b 为 True。',
          ],
        },
        {
          title: '2.2 数字与运算符',
          content: [
            'int 无精度上限（任意大整数，2**1000 也不会溢出）；float 是双精度；complex 表示复数，如 3+4j。',
            '/ 是真除法（7/2=3.5），// 是地板除（7//2=3），% 取余，** 是幂运算（2**10=1024）。注意负数地板除向下取整：-7//2 = -4。',
            'bool 是 int 的子类：True == 1，False == 0，可以参与算术运算（True + True == 2）。',
            '增强赋值 += -= *= /= //= %= **=；Python 没有 ++ 和 -- 运算符！写 i++ 会直接报语法错误。',
          ],
          code: {
            lang: 'python',
            source: `print(7 / 2)    # 3.5
print(7 // 2)   # 3
print(2 ** 10)  # 1024
print(True + 1) # 2
print(divmod(7, 2))  # (3, 1) 同时得商和余数`,
          },
        },
        {
          title: '2.3 字符串详解',
          content: [
            '字符串不可变，支持索引 s[0]、负数索引 s[-1]（最后一个字符）、切片 s[1:4]、s[::-1]（反转）。索引越界报 IndexError，切片越界不报错——重要区别。',
            '高频方法：upper/lower、strip（去两端空白）、split（切分成列表）、join（列表合成字符串）、replace、find（找不到返回 -1）、startswith/endswith、count。',
            'f-string 是格式化首选：f"{name}今年{age}岁"，支持表达式与格式说明 f"{pi:.2f}"（保留两位小数）。老式写法还有 % 格式化和 format()。',
            'join 的正确姿势记反率是 100%：",".join(["a","b"]) 得 "a,b"——分隔符在前，列表在后。',
          ],
          code: {
            lang: 'python',
            source: `s = "CodeMatrix"
print(s[0], s[-1])   # C x
print(s[0:4])        # Code
print(s[::-1])       # xirtaMedoC
name, age = "弈", 20
print(f"{name}今年{age}岁")`,
          },
        },
        {
          title: '2.4 类型转换与输入处理',
          content: [
            '转换函数：int()、float()、str()、bool()、list()、tuple()、set()、dict()。int("3.14") 报错，必须先 float 再 int。',
            'bool() 规则：0、0.0、""、[]、{}、None 为 False，其余为 True——空容器都是 False，非空即 True。',
            'eval() 能把字符串当表达式执行，功能强但有安全风险，处理用户输入时绝对不要用。初学阶段了解即可。',
          ],
        },
      ],
      quiz: [
        {
          question: '表达式 7 // 2、7 / 2、7 % 2 的结果依次是？',
          options: ['A. 3, 3, 1', 'B. 3, 3.5, 1', 'C. 3.5, 3.5, 1', 'D. 3, 3.5, 0'],
          answer: 'B',
          explanation: '// 地板除得整数 3；/ 真除法得 3.5；% 取余得 1。',
        },
        {
          question: '交换变量 a 与 b 的值，Python 的推荐写法是 ______。',
          answer: 'a, b = b, a',
          explanation: '元组解包语法，一行完成交换，无需临时变量。',
        },
        {
          question: 's = "hello"，执行 s[0] = "H" 会发生什么？',
          options: ['A. s 变为 "Hello"', 'B. 报 TypeError', 'C. s 不变', 'D. 报 IndexError'],
          answer: 'B',
          explanation: '字符串是不可变对象，不支持 item assignment。要"修改"只能生成新字符串，如 "H" + s[1:]。',
        },
        {
          question: 'bool([])、bool("0")、bool(0) 的值依次是 ______。',
          answer: 'False、True、False',
          explanation: '空列表为 False；"0" 是非空字符串为 True（陷阱！）；数字 0 为 False。',
        },
      ],
    },
    {
      id: 'py-ch3',
      title: '第 3 章 流程控制',
      intro: 'if 分支、for/while 循环、range 与 break/continue/else。',
      sections: [
        {
          title: '3.1 条件分支',
          content: [
            'if / elif / else 结构，条件后加冒号，代码块靠缩进。没有 switch（Python 3.10 引入 match-case 结构化模式匹配）。',
            '真值测试：0、0.0、""、[]、{}、None 都被视为 False，其余为 True。判断空列表直接写 if not lst: 而不是 if len(lst) == 0:。',
            '链式比较是 Python 特色：18 <= age < 60 等价于 18 <= age and age < 60，可读性极佳。',
            '条件表达式（三目）：x = a if a > b else b——赋值与判断一行完成，注意语序是"值1 if 条件 else 值2"。',
          ],
        },
        {
          title: '3.2 循环与 range',
          content: [
            'for 遍历的是"可迭代对象"：for x in [1,2,3]、for c in "abc"、for i in range(5)。while 按条件循环，适合次数不确定的场景。',
            'range(start, stop, step) 左闭右开：range(1, 5) 生成 1,2,3,4；range(10, 0, -2) 生成 10,8,6,4,2。range 是惰性序列，不占用内存。',
            '循环的 else 子句是 Python 独有：循环没有被 break 打断时才执行 else，常用于"查找失败"场景。',
            'enumerate() 同时取下标与元素：for i, x in enumerate(lst)；zip() 并行遍历多个序列：for a, b in zip(names, scores)。',
          ],
          code: {
            lang: 'python',
            caption: 'for-else 查找',
            source: `nums = [2, 4, 6, 8]
for n in nums:
    if n % 2 == 1:
        print("找到奇数", n)
        break
else:
    print("没有找到奇数")  # 循环正常结束才执行`,
          },
        },
        {
          title: '3.3 循环经典算法',
          content: [
            '累加用 sum(range(101)) 一行秒杀，但考试要求手写循环时要知道 for + += 模板。',
            '斐波那契 Python 版极其优雅：a, b = 0, 1; while a < 100: print(a); a, b = b, a + b——同步赋值避免临时变量。',
            'break 只跳出一层循环；多层循环想全部跳出可以用标志变量，或把循环包进函数用 return。',
          ],
        },
      ],
      quiz: [
        {
          question: 'range(1, 10, 3) 生成的数字序列是？',
          options: ['A. 1 4 7 10', 'B. 1 4 7', 'C. 1 3 5 7 9', 'D. 3 6 9'],
          answer: 'B',
          explanation: '从 1 开始步长 3，左闭右开不含 10：1、4、7。',
        },
        {
          question: '循环的 else 子句在什么时候执行？',
          answer: '循环没有被 break 打断、正常结束时执行',
          explanation: 'for-else / while-else 是 Python 独有，else 表示"找了一圈没找到"，与 if 的 else 语义不同。',
        },
        {
          question: 'for i, x in enumerate(["a", "b"]) 中，循环变量 i 和 x 第一轮的值分别是 ______。',
          answer: '0 和 "a"',
          explanation: 'enumerate 同时产出 (下标, 元素)，默认下标从 0 开始（可用 start 参数改）。',
        },
        {
          question: 'Python 中 x = a if a > b else b 的作用是？',
          options: ['A. 语法错误', 'B. 取 a、b 较大值赋给 x', 'C. 比较 a 与 b', 'D. 死循环'],
          answer: 'B',
          explanation: '条件表达式：条件为真取值 a，否则取值 b——等价于其他语言的 a > b ? a : b。',
        },
      ],
    },
    {
      id: 'py-ch4',
      title: '第 4 章 核心数据结构',
      intro: '列表、元组、字典、集合的特性与常用操作。',
      sections: [
        {
          title: '4.1 列表 list',
          content: [
            '列表是有序、可变、允许重复的序列。增：append(尾部加一个)/extend(合并另一个列表)/insert(按位置插)；删：remove(按值，删第一个)/pop(按下标，默认末尾)/del；查：index/count/in。',
            '排序：list.sort() 就地排序返回 None（print(lst.sort()) 输出 None 是经典坑）；sorted(list) 返回新列表。reverse() 就地反转。',
            '列表推导式是 Python 的灵魂写法：[x*x for x in range(10) if x % 2 == 0]，一行完成过滤与映射，比 append 循环快且优雅。',
            '嵌套列表即二维表：matrix = [[1,2],[3,4]]，matrix[0][1] 取 2。注意 [[0]*3]*3 的浅拷贝陷阱——三行是同一个列表！正确写法 [[0]*3 for _ in range(3)]。',
          ],
          code: {
            lang: 'python',
            source: `nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(nums))          # [1, 1, 2, 3, 4, 5, 6, 9]
evens = [x for x in nums if x % 2 == 0]
print(evens)                 # [4, 2, 6]
print(nums.count(1))         # 2`,
          },
        },
        {
          title: '4.2 元组与集合',
          content: [
            '元组 tuple 有序不可变，用圆括号或逗号创建：t = 1, 2, 3。单元素元组必须写 (1,)——(1) 只是数字 1。常用于函数多返回值与字典键。',
            '集合 set 无序、不重复，用大括号或 set()。支持数学运算：并 |、交 &、差 -、对称差 ^，去重利器：list(set(lst))（不保序）。',
            '空集合必须用 set()，{} 创建的是空字典——经典陷阱。集合元素必须可哈希（不可变），列表不能做集合元素。',
          ],
        },
        {
          title: '4.3 字典 dict',
          content: [
            '字典是键值对映射，键必须可哈希（不可变），Python 3.7+ 保证插入顺序。访问：d[key]（不存在报 KeyError）、d.get(key, 默认值)（安全）。',
            '增删改：d[k]=v、update(批量)、pop(按键删)、setdefault(不存在才设)、del d[k]；遍历：keys()、values()、items()，最常写 for k, v in d.items():。',
            '字典推导式：{c: s.count(c) for c in set(s)} 一行统计字符频次。setdefault 与 collections.defaultdict 是计数场景的两种优雅解法。',
            '嵌套字典/列表是 JSON 数据的原生形态：data = {"users": [{"name": "弈", "age": 20}]}，访问 data["users"][0]["name"]。',
          ],
          code: {
            lang: 'python',
            source: `d = {"apple": 3, "banana": 5}
d["apple"] += 1
print(d.get("orange", 0))   # 0，不报错
for k, v in d.items():
    print(k, v)
squares = {x: x*x for x in range(1, 4)}  # {1: 1, 2: 4, 3: 9}`,
          },
        },
        {
          title: '4.4 四大数据结构对比速查',
          content: [
            'list：有序可变可重复，万能容器；tuple：有序不可变，用于"记录"（坐标、RGB）；dict：键值映射，查找 O(1)；set：去重与集合运算。',
            '选型口诀：要改用 list，不改用 tuple，按键查用 dict，去重用 set。',
            'in 运算符的性能：list/tuple 是 O(n) 逐个扫描，dict/set 是 O(1) 哈希直达——大数据量判存在性务必用 set。',
          ],
        },
      ],
      quiz: [
        {
          question: '创建空集合的正确写法是？',
          options: ['A. s = {}', 'B. s = set()', 'C. s = []', 'D. s = ()'],
          answer: 'B',
          explanation: '{} 创建的是空字典！空集合必须用 set()。',
        },
        {
          question: 'lst = [3, 1, 2]; print(lst.sort()) 输出 ______。',
          answer: 'None',
          explanation: 'sort() 就地排序、返回 None。想要新列表用 sorted(lst)。',
        },
        {
          question: 'd = {"a": 1}; 下列访问 d["b"] 不报错的方式是？',
          options: ['A. d["b"]', 'B. d.get("b")', 'C. d.get("b", 0)', 'D. B 和 C'],
          answer: 'D',
          explanation: 'get 方法键不存在时返回 None 或指定默认值，不会抛 KeyError。',
        },
        {
          question: 't = (1) 的类型是 ______，t = (1,) 的类型是 ______。',
          answer: 'int；tuple',
          explanation: '单元素元组必须带逗号，否则括号只是数学分组。',
        },
      ],
    },
    {
      id: 'py-ch5',
      title: '第 5 章 函数',
      intro: 'def、参数体系、返回值、作用域、Lambda 与常用高阶函数。',
      sections: [
        {
          title: '5.1 参数体系',
          content: [
            '四类参数：位置参数、默认参数（def f(x, n=2)）、可变位置 *args（收进元组）、可变关键字 **kwargs（收进字典）。定义顺序必须是：位置 → 默认 → *args → **kwargs。',
            '默认参数陷阱：不要用可变对象做默认值（def f(lst=[])），默认值只在函数定义时创建一次，多次调用会共享。正确写法是默认 None，函数内再初始化。',
            '传参可用关键字：f(n=3, x=1) 打乱顺序。调用时 * 解包序列、** 解包字典：f(*[1,2]) 等价 f(1,2)。',
            '仅限关键字参数：def f(a, *, key) 中 key 必须用关键字传——读源码时遇到 * 不要慌。',
          ],
        },
        {
          title: '5.2 返回值与作用域',
          content: [
            'return 后无值或没有 return，函数返回 None。return a, b 实际返回元组，调用方可解包：x, y = f()。',
            'LEGB 作用域查找顺序：Local → Enclosing → Global → Built-in。函数内修改全局变量需 global 声明；嵌套函数改外层变量用 nonlocal。',
            '可变对象作为参数传入，函数内原地修改会影响外部（引用传递的效果）；重新赋值则不会——区分"修改内容"与"换标签"。',
            '函数是一等公民：可以赋值给变量、放进列表、作为参数传递——这是 Python 函数式编程的基础。',
          ],
        },
        {
          title: '5.3 Lambda 与高阶函数',
          content: [
            'lambda 参数: 表达式 创建匿名函数，只能写单个表达式，常用于排序键：sorted(students, key=lambda s: s[1], reverse=True)。',
            'map(f, lst)、filter(f, lst) 返回迭代器（需 list() 转换才能打印）；functools.reduce(f, lst) 累积计算。多数场景列表推导式更易读。',
            'key 函数思想：sorted/max/min 都接受 key 参数指定"按什么比较"，如 max(words, key=len) 找最长单词。',
          ],
          code: {
            lang: 'python',
            source: `students = [("张三", 90), ("李四", 85), ("王五", 95)]
students.sort(key=lambda s: s[1], reverse=True)
print(students)  # [('王五', 95), ('张三', 90), ('李四', 85)]

print(list(map(lambda x: x * x, [1, 2, 3])))  # [1, 4, 9]`,
          },
        },
        {
          title: '5.4 递归入门',
          content: [
            '递归两要素：递推关系（大问题拆成小问题）+ 终止条件（最小问题直接给答案）。缺终止条件会无限递归触发 RecursionError（默认深度约 1000）。',
            '经典三例：阶乘 f(n) = n * f(n-1)；斐波那契 f(n) = f(n-1) + f(n-2)（朴素递归极慢，存在大量重复计算）；汉诺塔移动 2ⁿ-1 步。',
            '记忆化优化：functools.lru_cache 装饰器一行给递归加缓存，斐波那契从指数级降到线性。',
          ],
        },
      ],
      quiz: [
        {
          question: 'def f(a, b=2, *args, **kwargs) 中，*args 和 **kwargs 分别收集成？',
          options: ['A. 列表和列表', 'B. 元组和字典', 'C. 字典和元组', 'D. 集合和字典'],
          answer: 'B',
          explanation: '多余的位置参数收进元组 args，多余的关键字参数收进字典 kwargs。',
        },
        {
          question: '函数内要使用并修改全局变量 count，必须先写 ______。',
          answer: 'global count',
          explanation: '没有 global 声明时对 count 赋值会创建同名局部变量，并因"先引用后赋值"报 UnboundLocalError。',
        },
        {
          question: 'def f(lst=[]): lst.append(1); return lst。两次调用 f() 第二次返回？',
          options: ['A. [1]', 'B. [1, 1]', 'C. 报错', 'D. []'],
          answer: 'B',
          explanation: '可变默认参数只在定义时创建一次，多次调用共享同一个列表，内容不断累积。',
        },
        {
          question: 'max(["apple", "hi", "banana"], key=len) 的结果是 ______。',
          answer: '"banana"',
          explanation: 'key=len 表示按长度比较，banana 最长（6 个字符）。',
        },
      ],
    },
    {
      id: 'py-ch6',
      title: '第 6 章 面向对象与异常',
      intro: '类、继承、魔术方法与异常处理机制。',
      sections: [
        {
          title: '6.1 类与对象',
          content: [
            'class 定义类，__init__ 是初始化方法（不是构造，构造是 __new__），第一个参数 self 指实例本身，调用时自动传入——写方法永远别漏 self。',
            '属性可直接动态添加（obj.x = 1），约定单下划线 _x 表示内部使用，双下划线 __x 触发名称改写（_类名__x）实现"伪私有"。',
            '类属性 vs 实例属性：写在类里的是类属性（所有实例共享），写在 __init__ 里 self.x 是实例属性。用实例修改类属性会创建同名实例属性遮蔽它。',
            '继承：class Dog(Animal)，用 super().__init__() 调用父类初始化，支持多继承（MRO 按 C3 线性化，可用 类名.__mro__ 查看）。',
          ],
          code: {
            lang: 'python',
            source: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def __str__(self):
        return f"{self.name}: {self.score}分"

s = Student("弈", 98)
print(s)  # 弈: 98分`,
          },
        },
        {
          title: '6.2 魔术方法速览',
          content: [
            '__str__ 控制 print(obj) 的显示（面向用户）；__repr__ 控制交互式直接输入 obj 的显示（面向开发者，应能像代码一样重建对象）。',
            '__len__ 让 len(obj) 可用；__eq__ 让 == 按内容比较；__add__ 让 obj1 + obj2 可用（运算符重载）。',
            '__getitem__ 让 obj[i] 可用，是自定义"类列表"容器的关键。这些双下划线方法统称 dunder/magic methods。',
          ],
        },
        {
          title: '6.3 异常处理',
          content: [
            'try / except / else / finally：try 出错进 except；没出错执行 else；finally 无论如何都执行。except 可指定异常类型，多个类型用元组 except (ValueError, TypeError):。',
            'raise 主动抛出异常：raise ValueError("年龄不能为负")；自定义异常继承 Exception。异常链 raise ... from e 保留原始原因。',
            '常见内置异常：ValueError（值不对）、TypeError（类型不对）、KeyError、IndexError、ZeroDivisionError、FileNotFoundError、AttributeError。',
            'EAFP 风格：Python 鼓励"先做再道歉"（try 然后 except），而不是"先问再做"（层层 if 检查）——但 except 要抓具体异常，裸 except: 会掩盖 bug。',
          ],
          code: {
            lang: 'python',
            source: `try:
    n = int("abc")
except ValueError as e:
    print("转换失败:", e)
else:
    print("成功")
finally:
    print("收尾工作")`,
          },
        },
      ],
      quiz: [
        {
          question: 'Python 类的方法定义中，第一个参数通常命名为 ______，它代表______。',
          answer: 'self；调用该方法的实例对象本身',
          explanation: 'self 是约定俗成的名字（可改但别改），调用 obj.method() 时 Python 自动把 obj 传进去。',
        },
        {
          question: '想让 print(对象) 输出自定义内容，应重写哪个魔术方法？',
          options: ['A. __init__', 'B. __str__', 'C. __print__', 'D. __len__'],
          answer: 'B',
          explanation: '__str__ 决定 str(obj) 与 print(obj) 的输出；__repr__ 面向开发者调试。',
        },
        {
          question: 'try 没有出错时执行 else；无论是否出错都执行的是 ______。',
          answer: 'finally',
          explanation: 'else 只在无异常时执行；finally 保证执行（用于释放资源）。',
        },
      ],
    },
    {
      id: 'py-ch7',
      title: '第 7 章 文件操作与模块',
      intro: '程序要处理真实数据，就得会读写文件；要站在巨人肩膀上，就得会用模块。本章掌握 open/with 文件操作、CSV 与 JSON 两种主流数据格式，以及模块导入与 pip 包管理。',
      sections: [
        {
          title: '7.1 文件读写：open 与 with',
          content: [
            '`open("a.txt", "r", encoding="utf-8")` 打开文件并返回文件对象。模式：\'r\' 读（默认）、\'w\' 写（清空原内容）、\'a\' 追加、\'b\' 二进制（如 \'rb\'）。',
            '读法三选一：read() 全文读成一个大字符串；readline() 读一行；readlines() 读成行的列表。遍历大文件直接 for line in f 最省内存。',
            '写文件用 f.write("内容")，注意它不会自动换行，要自己加 \\n。',
            '`with open(...) as f:` 是标准姿势：出了 with 块文件自动关闭，即使中途报错也不漏。不写 with 就必须手动 f.close()。',
            '中文文件永远显式写 encoding="utf-8"，否则 Windows 默认 GBK、Mac/Linux 默认 UTF-8，换个系统就乱码。',
          ],
          code: {
            lang: 'python',
            caption: '文件读写标准模板',
            source: `# 写文件
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("第一行\\n")
    f.write("第二行\\n")

# 读文件：逐行遍历，最省内存
with open("notes.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())  # strip() 去掉行尾换行符`,
          },
        },
        {
          title: '7.2 CSV 与 JSON：两种主流数据格式',
          content: [
            '`CSV`（逗号分隔值）是表格数据的通用格式，Excel 能直接打开。用 csv 模块读写：csv.reader 逐行读成列表，csv.writer 逐行写。',
            '`JSON` 是网络传输和配置文件的事实标准，长得就像 Python 的字典/列表。json.loads() 把 JSON 字符串解析成 Python 对象，json.dumps() 反向转换，ensure_ascii=False 让中文不被转义。',
            'json.dump(obj, f) / json.load(f) 直接读写文件，比先 read 再 loads 少一步。',
            '选型：纯表格数据用 CSV（简单、Excel 友好）；层级结构、嵌套数据用 JSON（表达力强、接口通用）。',
          ],
          code: {
            lang: 'python',
            caption: 'JSON 的存与取',
            source: `import json

data = {"name": "弈", "scores": [90, 85, 100]}

# 存进文件
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读回来
with open("data.json", "r", encoding="utf-8") as f:
    obj = json.load(f)
print(obj["scores"][0])  # 90`,
          },
        },
        {
          title: '7.3 模块、包与 pip',
          content: [
            '`模块`就是一个 .py 文件：import math 之后用 math.sqrt(16)。Python 自带的叫标准库，别人写好发布的叫第三方库。',
            '导入方式三种：import math（用 math.sqrt）；from math import sqrt（直接用 sqrt，但可能重名）；import numpy as np（起别名，科学计算惯例）。',
            '`pip` 是 Python 的包管理器：pip install requests 下载安装第三方库，pip list 查看已装，pip uninstall 卸载。官方仓库 PyPI 上有几十万个库。',
            '__name__ == "__main__" 的奥秘：直接运行文件时 __name__ 是 "__main__"，被 import 时是模块名。用它区分"脚本入口"和"被导入"，让模块既能被引用又能独立运行。',
          ],
          code: {
            lang: 'python',
            caption: '模块导入与主入口保护',
            source: `import math
from random import randint

print(math.sqrt(16))   # 4.0
print(randint(1, 100)) # 1~100 随机整数

def main():
    print("程序从这里开始")

if __name__ == "__main__":
    main()  # 只有直接运行本文件时才执行`,
          },
        },
      ],
      quiz: [
        {
          question: '用 with open(...) as f: 打开文件的最大好处是？',
          options: ['A. 读取更快', 'B. 代码块结束后自动关闭文件', 'C. 可以不用指定编码', 'D. 支持更大的文件'],
          answer: 'B',
          explanation: 'with 是上下文管理器，无论正常结束还是中途报错都会自动 close()，避免资源泄漏。',
        },
        {
          question: '把 Python 字典转成 JSON 字符串，且保留中文不转义，正确写法是？',
          answer: 'json.dumps(d, ensure_ascii=False)',
          explanation: 'dumps 默认把非 ASCII 字符转成 \\uXXXX 转义序列，ensure_ascii=False 让中文原样输出。',
        },
        {
          question: 'if __name__ == "__main__": 这行代码的作用是？',
          answer: '只有直接运行该文件时才执行其下的代码；被 import 时不执行',
          explanation: '__name__ 在直接运行时是 "__main__"，被导入时是模块名。这行判断让模块同时支持"作为脚本运行"和"作为库被引用"。',
        },
      ],
    },
    {
      id: 'py-ch8',
      title: '第 8 章 常用标准库实战',
      intro: 'Python 的口号是"自带电池"——标准库几乎什么都有。本章拿下最高频的四个：math、random、datetime、collections，学完能解决 80% 的日常计算与数据处理需求。',
      sections: [
        {
          title: '8.1 math 与 random',
          content: [
            '`math` 是数学工具箱：sqrt 开方、ceil 向上取整、floor 向下取整、gcd 最大公约数、pi 圆周率、factorial 阶乘。注意它们大多返回 float 或 int，类型看文档。',
            '`random` 生成随机数：random() 得 [0,1) 小数；randint(1, 6) 得闭区间整数（含两端，和 range 不同！）；choice(lst) 随机抽一个；shuffle(lst) 原地打乱；sample(lst, 3) 不重复抽 3 个。',
            'random.seed(42) 固定随机种子后，每次运行生成的"随机"序列完全相同——调试和复现实验时非常有用。',
          ],
          code: {
            lang: 'python',
            caption: 'math 与 random 速用',
            source: `import math, random

print(math.gcd(12, 18))     # 6
print(math.ceil(3.2))       # 4

random.seed(42)             # 固定种子，结果可复现
print(random.randint(1, 6)) # 掷骰子
cards = ["A", "K", "Q", "J"]
print(random.choice(cards)) # 随机抽一张
random.shuffle(cards)       # 打乱顺序
print(cards)`,
          },
        },
        {
          title: '8.2 datetime 与时间处理',
          content: [
            '`datetime` 模块处理日期时间：datetime.now() 当前时刻，date.today() 今天，timedelta 表示时间差。',
            '加减时间用 timedelta：today + timedelta(days=7) 是一周后；两个 datetime 相减得到 timedelta，.days 取天数。',
            '格式化两个方向：strftime 把时间对象格式化成字符串（如 "%Y-%m-%d"），strptime 把字符串解析回时间对象。格式代码 %Y 年 %m 月 %d 日 %H 时 %M 分 %S 秒。',
            'time.time() 返回当前时间戳（从 1970 年至今的秒数），计时、做缓存过期判断都用它。',
          ],
          code: {
            lang: 'python',
            caption: '日期计算与格式化',
            source: `from datetime import date, timedelta

today = date.today()
print(today.strftime("%Y年%m月%d日"))   # 格式化输出

deadline = today + timedelta(days=30)   # 30 天后
print((deadline - today).days)          # 30

d = date(2026, 1, 1)
print(d.strftime("%A"))                 # 星期几（英文）`,
          },
        },
        {
          title: '8.3 collections：进阶容器三件套',
          content: [
            '`Counter` 计数器：Counter("hello") 直接统计每个字符出现次数，most_common(3) 取前三名。词频统计一行搞定。',
            '`defaultdict` 带默认值的字典：defaultdict(list) 访问不存在的键自动创建空列表，分组统计时省去 if key in d 的判断。',
            '`deque` 双端队列：append/popleft 两头操作都是 O(1)，做队列比 list 快得多（list 的 pop(0) 是 O(n)）。',
            '这三个类都来自 collections 模块，使用前 from collections import Counter, defaultdict, deque。',
          ],
          code: {
            lang: 'python',
            caption: 'Counter 与 defaultdict 实战',
            source: `from collections import Counter, defaultdict

words = "apple banana apple orange apple banana".split()
c = Counter(words)
print(c.most_common(2))   # [('apple', 3), ('banana', 2)]

# 按首字母分组
groups = defaultdict(list)
for w in words:
    groups[w[0]].append(w)
print(dict(groups))  # {'a': ['apple', ...], 'b': [...], 'o': [...]}`,
          },
        },
      ],
      quiz: [
        {
          question: 'random.randint(1, 10) 生成的范围是？',
          options: ['A. 1~9，不含 10', 'B. 1~10，含两端', 'C. 0~10', 'D. 0~1 之间的小数'],
          answer: 'B',
          explanation: 'randint 是闭区间，两端都包含——这是它和 range 最不一样的地方，考试常考。',
        },
        {
          question: '统计一个列表中各元素出现次数，最省事的方法是？',
          answer: 'collections.Counter(lst)，再用 most_common() 取高频项',
          explanation: 'Counter 专为计数设计，一行替代手写字典循环累加，是标准库"自带电池"的典型代表。',
        },
        {
          question: '把 datetime 对象转成 "2026-10-07" 这样的字符串用哪个方法？反向解析呢？',
          answer: 'strftime 格式化输出；strptime 把字符串解析回 datetime 对象',
          explanation: '记忆：f = format（格式化），p = parse（解析）。格式代码 %Y-%m-%d 两端保持一致即可互转。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'py-p1',
      title: '读程序写结果：切片与索引',
      category: '读程序写结果',
      difficulty: 2,
      analysis: [
        '切片 s[start:stop:step] 左闭右开，step 为负表示反向。越界不报错是切片与索引最大的区别。',
        '解题模板：先标出每个字符的下标（正负两套），再按 start、stop、step 三步推导。',
      ],
      keyPoints: ['左闭右开', '负数索引从 -1 开始', 's[::-1] 反转', '切片越界不报错'],
      example: {
        question: 's = "abcdef"，写出 s[1:4]、s[-2:]、s[::2]、s[::-1] 的结果。',
        answer: '"bcd"、"ef"、"ace"、"fedcba"',
        explanation: 's[1:4] 取下标 1,2,3；s[-2:] 取最后两个；s[::2] 隔一个取一个；步长 -1 整体反向。',
      },
      traps: ['误以为 stop 位置会被包含', '负数步长时 start 应大于 stop', '混淆 s[0:0]（空串）与 s[0]'],
    },
    {
      id: 'py-p2',
      title: '选择题：可变与不可变对象',
      category: '选择题',
      difficulty: 3,
      analysis: [
        'Python 一切皆对象，类型题的核心是分清可变（list、dict、set）与不可变（int、float、str、tuple）。',
        '赋值传的是引用。对可变对象的"原地修改"影响所有引用者；对不可变对象的"修改"必然产生新对象。',
      ],
      keyPoints: ['is 比较身份，== 比较值', '可变对象作默认参数有坑', '+= 对列表是原地扩展，对元组是新建', '函数传参共享对象'],
      example: {
        question: 'def f(a, lst=[]): lst.append(a); return lst。连续调用 f(1)、f(2) 后第二次返回什么？',
        answer: '[1, 2]',
        explanation: '默认列表在函数定义时只创建一次，两次调用共享同一个列表，元素累积。这是 Python 最经典的陷阱题。',
      },
      traps: ['以为每次调用都会新建默认列表', '混淆 == 与 is', '以为 tuple 完全不能"变"（其内部可变元素仍可改）'],
    },
    {
      id: 'py-p3',
      title: '程序填空：列表推导式与内置函数',
      category: '程序填空',
      difficulty: 2,
      analysis: [
        '填空题常给出普通循环，要求补全等价的推导式或内置函数调用。熟记推导式骨架：[表达式 for 变量 in 序列 if 条件]。',
        '配套高频内置函数：len、sum、max、min、sorted、enumerate、zip、range、map、filter。',
      ],
      keyPoints: ['推导式骨架', 'enumerate 拿 (下标, 值)', 'zip 并行遍历', 'sorted(key=...)'],
      example: {
        question: '补全：用一行代码生成 1~20 中所有 3 的倍数的平方组成的列表。',
        answer: '[x**2 for x in range(1, 21) if x % 3 == 0] → [9, 36, 81, 144, 225, 324]',
        explanation: 'range(1, 21) 保证 20 被包含；if 过滤倍数；表达式 x**2 做映射。',
      },
      traps: ['range 右边界忘记 +1', 'if 与 for 的顺序写反', '把 ** 写成 ^（^ 是按位异或）'],
    },
    {
      id: 'py-p4',
      title: '编程题：字符串处理',
      category: '编程题',
      difficulty: 3,
      analysis: [
        '字符串题常见要求：统计、反转、判断回文、大小写转换、按规则替换。先想清用"遍历+判断"还是"内置方法+推导式"。',
        '判回文标准解：s == s[::-1]；统计词频标准解：字典或 collections.Counter。',
      ],
      keyPoints: ['回文判断一行式', 'split 处理单词', 'isdigit/isalpha/isupper 判断字符类别', 'join 拼接效率高于 +='],
      example: {
        question: '统计字符串 "Hello World" 中各字符出现次数（忽略大小写与空格），输出字典。',
        answer: "使用 dict：for c in s.lower(): if c != ' ': d[c] = d.get(c, 0) + 1，结果 {'h':1,'e':1,'l':3,'o':2,'w':1,'r':1,'d':1}",
        explanation: 'lower() 统一大小写，get(c, 0) 优雅处理首次出现的键。',
      },
      traps: ['忘记忽略大小写', 'd[c] 直接 += 遇新键抛 KeyError', '用 s.replace 循环替换导致逻辑混乱'],
    },
    {
      id: 'py-p5',
      title: '读程序写结果：函数作用域与传参',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        '考查 LEGB 规则与"可变对象传参共享"特性。解题关键：区分函数内是"重新赋值"（创建局部变量）还是"原地修改"（影响外部）。',
        '遇到 UnboundLocalError 相关选项，通常是函数内对全局变量做了 += 却没有 global 声明。',
      ],
      keyPoints: ['赋值即局部', 'append 是原地修改', 'global / nonlocal', '默认参数共享'],
      example: {
        question: 'x = 10; def f(): x = x + 1; f() 会发生什么？',
        answer: '抛出 UnboundLocalError',
        explanation: '函数内出现对 x 的赋值，x 被视为局部变量；右侧 x + 1 在赋值前引用该局部变量，尚未绑定，报错。',
      },
      traps: ['以为会自动读全局的 10', 'global 声明位置错误（必须在首次使用前）', '把可变对象的修改误判为重新赋值'],
    },
    {
      id: 'py-p6',
      title: '程序改错：缩进与常见语法错误',
      category: '程序改错',
      difficulty: 1,
      analysis: [
        'Python 改错题八成是缩进、冒号、括号配对问题。检查顺序：①每行块首是否冒号结尾；②缩进是否一致；③括号引号是否成对。',
        '运行时报错信息会直接给出行号与异常类型，学会读 Traceback 是基本功。',
      ],
      keyPoints: ['冒号结尾', '4 空格统一缩进', 'Tab 与空格不混用', 'Traceback 从最后一行往前读'],
      example: {
        question: '改正：if x > 0\nprint("正数")',
        answer: 'if x > 0: 后换行并缩进 print("正数")',
        explanation: 'if 语句末尾必须加冒号，且从属代码块必须缩进，二者缺一不可。',
      },
      traps: ['中文冒号/引号混入', 'else 与 if 缩进不对齐', 'print 漏括号（Python2 遗风）'],
    },
    {
      id: 'py-p7',
      title: '编程题：字典与数据统计',
      category: '编程题',
      difficulty: 4,
      analysis: [
        '数据统计是 Python 应用题的核心场景：词频统计、分组求和、Top-N。标准套路是"字典累加 + sorted 排序取前 N"。',
        'Top-N 模板：sorted(d.items(), key=lambda kv: kv[1], reverse=True)[:n]。',
      ],
      keyPoints: ['d.get(k, 0) + 1', 'items() 遍历', 'lambda 排序键', 'Counter 一行统计'],
      example: {
        question: '给定成绩字典 scores = {"语文":90,"数学":85,"英语":92}，按分数从高到低输出每科一行："英语 92" 等格式。',
        answer: 'for k, v in sorted(scores.items(), key=lambda kv: kv[1], reverse=True): print(k, v)',
        explanation: 'items() 得到键值元组列表，按值降序排序后逐项输出。',
      },
      traps: ['排序键写成 kv[0] 变成按科目排序', '忘记 reverse=True', 'print 输出成元组格式'],
    },
    {
      id: 'py-p8',
      title: '选择题：浅拷贝与深拷贝',
      category: '选择题',
      difficulty: 4,
      analysis: [
        '赋值、浅拷贝、深拷贝三分天下：b = a 共享一切；b = a.copy() 只复制第一层（嵌套列表仍共享）；copy.deepcopy 完全独立。',
        '判断题中改 b[0] 是否影响 a，先看拷贝层级，再看改的是第一层还是嵌套层。',
      ],
      keyPoints: ['= 只是贴标签', 'copy()/[:] 浅拷贝', 'deepcopy 递归复制', '嵌套结构是重灾区'],
      example: {
        question: 'a = [[1,2],[3,4]]; b = a.copy(); b[0].append(9); 此时 a 是？',
        answer: '[[1, 2, 9], [3, 4]]',
        explanation: '浅拷贝只复制外层，内层列表 [1,2] 仍被 a、b 共享，append 影响双方。',
      },
      traps: ['以为 copy() 后就完全独立', '对不可变嵌套元素使用深拷贝的思维', '混淆切片拷贝与赋值'],
    },
  ],
  exercises: [
    {
      id: 'py-e1', type: 'choice', title: '运算符辨析', difficulty: 1, tags: ['运算符'],
      question: 'Python 中表达式 7 // 2 与 7 / 2 的结果分别是？',
      options: ['A. 3 和 3.5', 'B. 3.5 和 3.5', 'C. 3 和 3', 'D. 4 和 3.5'],
      answer: 'A',
      explanation: '// 是地板除得整数 3；/ 是真除法得 3.5。',
    },
    {
      id: 'py-e2', type: 'choice', title: '切片结果', difficulty: 2, tags: ['字符串'],
      question: 's = "python"，s[1:4] 的结果是？',
      options: ['A. "pyt"', 'B. "yth"', 'C. "ytho"', 'D. "py"'],
      answer: 'B',
      explanation: '切片左闭右开，取下标 1、2、3，即 y、t、h。',
    },
    {
      id: 'py-e3', type: 'choice', title: '可变对象陷阱', difficulty: 4, tags: ['函数'],
      question: 'def f(x, lst=[]): lst.append(x); return lst。执行 print(f(1), f(2)) 输出？',
      options: ['A. [1] [2]', 'B. [1] [1, 2]', 'C. 报错', 'D. [1, 2] [1, 2]'],
      answer: 'B',
      explanation: '默认参数列表只创建一次，两次调用共享，第二次返回 [1, 2]。',
    },
    {
      id: 'py-e4', type: 'choice', title: '字典操作', difficulty: 2, tags: ['字典'],
      question: 'd = {"a": 1}; print(d.get("b", 0)) 与 print(d["b"]) 的行为分别是？',
      options: ['A. 输出 0；输出 None', 'B. 输出 0；抛出 KeyError', 'C. 都抛出 KeyError', 'D. 输出 None；抛出 KeyError'],
      answer: 'B',
      explanation: 'get 提供默认值不报错；中括号访问不存在的键抛出 KeyError。',
    },
    {
      id: 'py-e5', type: 'choice', title: '循环 else', difficulty: 3, tags: ['流程控制'],
      question: 'for i in range(3):\n    print(i)\nelse:\n    print("done")\n最后输出的是？',
      options: ['A. 不输出 done', 'B. 输出 done', 'C. 语法错误', 'D. 只在 break 时输出 done'],
      answer: 'B',
      explanation: '循环没有被 break 打断，正常结束后执行 else，输出 done。',
    },
    {
      id: 'py-e6', type: 'fill', title: '补全列表推导式', difficulty: 2, tags: ['列表'],
      question: '补全代码，得到 [0, 1, 4, 9, 16]：squares = [______ for x in range(5)]',
      answer: 'x*x（或 x**2）',
      explanation: '推导式前半部分是映射表达式，x*x 或 x**2 均可。',
    },
    {
      id: 'py-e7', type: 'fill', title: '交换变量', difficulty: 1, tags: ['基础语法'],
      question: '用 Python 特有的方式在一行内交换 a 与 b 的值：______',
      answer: 'a, b = b, a',
      explanation: 'Python 元组解包语法，无需临时变量。',
    },
    {
      id: 'py-e8', type: 'coding', title: 'Hello Python 与累加', difficulty: 1, tags: ['入门'],
      question: '第一行输出 "Hello Python"，第二行输出 1 到 100 的和，格式 "sum = 5050"。',
      starterCode: `# 在这里编写代码

`,
      expectedOutput: 'Hello Python\nsum = 5050',
      answer: 'print("Hello Python")，再用循环或 sum(range(1, 101)) 求和。',
      explanation: '入门题，熟悉 print 与 range。sum(range(1, 101)) 是最 Pythonic 的写法。',
      hints: ['range(1, 101) 才能包含 100', 'f-string: f"sum = {total}"'],
    },
    {
      id: 'py-e9', type: 'coding', title: '判断回文', difficulty: 2, tags: ['字符串'],
      question: '判断字符串 "level" 是否为回文，是则输出 "level 是回文"。',
      starterCode: `s = "level"
# 判断并输出

`,
      expectedOutput: 'level 是回文',
      answer: 'if s == s[::-1]: print(f"{s} 是回文")',
      explanation: 's[::-1] 得到反转字符串，与原串相等即回文。',
      hints: ['切片步长为 -1 表示反向'],
    },
    {
      id: 'py-e10', type: 'coding', title: '斐波那契前 10 项', difficulty: 3, tags: ['循环', '算法'],
      question: '输出斐波那契数列前 10 项，用空格分隔一行显示："0 1 1 2 3 5 8 13 21 34"。',
      starterCode: `a, b = 0, 1
# 循环输出前 10 项

`,
      expectedOutput: '0 1 1 2 3 5 8 13 21 34',
      answer: '循环 10 次收集 a 后 a, b = b, a + b，最后 " ".join(map(str, result)) 输出。',
      explanation: '利用 a, b = b, a+b 的同步赋值特性优雅迭代。用 join 控制格式避免行尾空格。',
      hints: ['result.append(a); a, b = b, a + b', '" ".join(map(str, result))'],
    },
    {
      id: 'py-e11', type: 'coding', title: '字符频次统计', difficulty: 3, tags: ['字典'],
      question: '统计 "banana" 中各字符出现次数，按出现顺序每行输出 "b: 1"、"a: 3"、"n: 2"。',
      starterCode: `s = "banana"
counts = {}
# 统计并输出

`,
      expectedOutput: 'b: 1\na: 3\nn: 2',
      answer: 'for c in s: counts[c] = counts.get(c, 0) + 1，然后 for k, v in counts.items(): print(f"{k}: {v}")',
      explanation: '字典 get 方法处理新键；Python 3.7+ 字典保持插入顺序，直接遍历即可。',
      hints: ['counts.get(c, 0)', 'items() 同时取键值'],
    },
    {
      id: 'py-e12', type: 'coding', title: '列表去重保序', difficulty: 4, tags: ['列表', '算法'],
      question: '列表 [3, 1, 3, 5, 1, 2] 去重且保持原顺序，输出 "[3, 1, 5, 2]"。不允许使用 set 直接转换（会打乱顺序）。',
      starterCode: `nums = [3, 1, 3, 5, 1, 2]
# 去重并保持顺序

`,
      expectedOutput: '[3, 1, 5, 2]',
      answer: 'result = []; for x in nums: if x not in result: result.append(x); print(result)',
      explanation: '用辅助列表 + not in 判断是直观解法；进阶可用 dict.fromkeys(nums) 一行实现（字典键去重且保序）。',
      hints: ['if x not in result', '或 print(list(dict.fromkeys(nums)))'],
    },
    {
      id: 'py-e13', type: 'choice', title: '字符串 join 方向', difficulty: 3, tags: ['字符串'],
      question: '把 ["a", "b", "c"] 用 "-" 连接成字符串的正确写法是？',
      options: ['A. ["a","b","c"].join("-")', 'B. "-".join(["a","b","c"])', 'C. join("-", ["a","b","c"])', 'D. "-".concat(["a","b","c"])'],
      answer: 'B',
      explanation: 'join 是字符串的方法：分隔符.join(序列)。方向写反是最高频的字符串错误之一。',
    },
    {
      id: 'py-e14', type: 'choice', title: 'is 与 == 辨析', difficulty: 4, tags: ['对象'],
      question: 'a = [1,2]; b = [1,2]; a == b 与 a is b 的结果分别是？',
      options: ['A. True True', 'B. True False', 'C. False False', 'D. False True'],
      answer: 'B',
      explanation: '== 比较内容（两个列表内容相同）；is 比较身份（两次字面量创建了两个不同对象）。',
    },
    {
      id: 'py-e15', type: 'choice', title: '生成器与惰性求值', difficulty: 5, tags: ['进阶'],
      question: 'g = (x*x for x in range(3)); print(list(g)); print(list(g)) 两次输出分别是？',
      options: [
        'A. [0,1,4] 和 [0,1,4]',
        'B. [0,1,4] 和 []',
        'C. 都报错',
        'D. [0,1,4] 和 None',
      ],
      answer: 'B',
      explanation: '生成器是一次性的：第一次 list() 已耗尽所有元素，第二次得到空列表。这是迭代器协议的核心特性。',
    },
    {
      id: 'py-e16', type: 'choice', title: '递归深度', difficulty: 5, tags: ['递归'],
      question: 'def f(n): return f(n-1) + 1，调用 f(5) 的结果是？',
      options: ['A. 返回 5', 'B. 返回 0', 'C. RecursionError', 'D. 死循环不报错'],
      answer: 'C',
      explanation: '没有终止条件，无限递归直至超过 Python 的递归深度限制（默认约 1000），抛出 RecursionError。',
    },
    {
      id: 'py-e17', type: 'choice', title: '字典推导式', difficulty: 4, tags: ['字典'],
      question: '{x: x % 2 for x in range(4)} 的结果是？',
      options: ['A. {0:0, 1:1, 2:0, 3:1}', 'B. [0,1,0,1]', 'C. {0,1}', 'D. 报错'],
      answer: 'A',
      explanation: '字典推导式 {键表达式: 值表达式 for ...}，x 取 0~3，值为各自对 2 取余。',
    },
    {
      id: 'py-e18', type: 'choice', title: '异常捕获顺序', difficulty: 4, tags: ['异常'],
      question: 'try: int("abc") 接 except ValueError: print("A") 与 except Exception: print("B")，输出是？',
      options: ['A. B', 'B. A', 'C. AB', 'D. 报错未被捕获'],
      answer: 'B',
      explanation: 'int("abc") 抛 ValueError，第一个 except 精确匹配先捕获；若两个 except 顺序颠倒，父类 Exception 会截胡。',
    },
    {
      id: 'py-e19', type: 'fill', title: '补全 Top-N 排序', difficulty: 4, tags: ['排序', 'lambda'],
      question: '取成绩最高的前 2 名：top2 = sorted(scores.items(), key=lambda kv: ______, reverse=True)[:2]',
      answer: 'kv[1]',
      explanation: 'items() 产出 (姓名, 分数) 元组，kv[1] 是分数；reverse=True 降序，[:2] 取前两名。',
    },
    {
      id: 'py-e20', type: 'fill', title: '补全 enumerate', difficulty: 3, tags: ['循环'],
      question: '同时遍历下标与元素：for i, x in ______(["a", "b", "c"]): print(i, x)',
      answer: 'enumerate',
      explanation: 'enumerate 返回 (下标, 元素) 对，是"带下标遍历"的标准写法。',
    },
    {
      id: 'py-e21', type: 'fill', title: '二维列表陷阱', difficulty: 5, tags: ['列表'],
      question: 'm = [[0]*3]*3 后执行 m[0][0] = 1，此时 m[1][0] 的值是 ______。',
      answer: '1',
      explanation: '*3 复制的是引用，三行指向同一个列表对象，改一行等于改所有行。正确写法 [[0]*3 for _ in range(3)]。',
    },
    {
      id: 'py-e22', type: 'coding', title: '统计单词频次 Top1', difficulty: 4, tags: ['字典', '算法'],
      question: '句子 "the quick brown fox jumps over the lazy dog the" 中出现次数最多的单词是 the（3 次）。输出两行：\nthe\n3',
      starterCode: `sentence = "the quick brown fox jumps over the lazy dog the"
# 用字典统计词频，找出出现最多的单词

`,
      expectedOutput: 'the\n3',
      answer: 'split() 分词 → 字典计数 → max(d, key=d.get) 找最大值的键。',
      explanation: 'max(d, key=d.get) 是按值取键的惯用法；也可用 d.items() 配合 sorted。',
      hints: ['words = sentence.split()', 'counts[w] = counts.get(w, 0) + 1', 'max(counts, key=counts.get)'],
    },
    {
      id: 'py-e23', type: 'coding', title: '数字各位求和', difficulty: 3, tags: ['字符串', '算法'],
      question: '对整数 12345 的各位数字求和，输出 "sum = 15"。（提示：把数字转成字符串逐位处理）',
      starterCode: `n = 12345
# 各位数字求和

`,
      expectedOutput: 'sum = 15',
      answer: 'total = sum(int(c) for c in str(n)); print(f"sum = {total}")',
      explanation: 'str(n) 把数字变成可遍历的字符串，int(c) 逐位还原，sum 求和——一行搞定。',
      hints: ['str(12345) 得到 "12345"', 'sum(int(c) for c in str(n))'],
    },
    {
      id: 'py-e24', type: 'coding', title: '冒泡排序手写', difficulty: 5, tags: ['排序', '算法'],
      question: '不使用 sort/sorted，手写冒泡排序把 [5, 2, 8, 1, 9] 升序排列，输出 "[1, 2, 5, 8, 9]"。',
      starterCode: `nums = [5, 2, 8, 1, 9]
# 手写冒泡排序

`,
      expectedOutput: '[1, 2, 5, 8, 9]',
      answer: '双重循环：for i in range(n-1): for j in range(n-1-i): if nums[j] > nums[j+1]: 交换。',
      explanation: '每轮把最大值冒泡到末尾，内层上界 n-1-i 逐轮缩短。交换用 nums[j], nums[j+1] = nums[j+1], nums[j]。',
      hints: ['n = len(nums)', 'range(n - 1 - i)', '元组解包交换两个元素'],
    },
  ],
}
