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
    {
      id: 'py-ch9',
      title: '第 9 章 迭代器与生成器',
      intro: '为什么 for 能遍历列表、文件甚至无穷数列？背后是迭代器协议；而生成器让你用 yield 轻松制造"用多少算多少"的惰性序列，是处理大数据的利器。',
      sections: [
        {
          title: '9.1 迭代器协议',
          content: [
            '`可迭代对象`（Iterable）：能被 for 遍历的东西——列表、字符串、字典、range、文件。它们都实现了 __iter__() 方法。',
            '`迭代器`（Iterator）：iter() 把可迭代对象变成迭代器，next() 每次取一个元素，取完抛 StopIteration 异常——for 循环内部就是这么干的。',
            '关键区别：列表把所有元素存在内存里；迭代器"现用现算"，不存全部数据。',
            'iter 工具函数：map、filter、zip、enumerate 返回的都是迭代器，只能完整遍历一次，想看内容先 list() 化。',
          ],
          code: {
            lang: 'python',
            caption: '手动模拟 for 循环',
            source: `lst = [10, 20, 30]
it = iter(lst)        # 得到迭代器

print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# print(next(it))  # StopIteration！

# for x in lst 的底层就是 iter + 循环 next + 捕获 StopIteration`,
          },
        },
        {
          title: '9.2 生成器函数与 yield',
          content: [
            '`生成器`是特殊的迭代器：函数里有 `yield` 关键字，调用它不执行，而是返回一个生成器对象。',
            '每次 next() 执行到下一个 yield 暂停并交出值，下次从暂停处继续——像游戏的"存档点"。',
            '惰性求值的价值：def fib() 可以生成无限斐波那契数列而不会撑爆内存，因为算一个才有一个。',
            '生成器表达式是列表推导式的惰性版：(x*x for x in range(10**9)) 只占常数内存，把 [] 换成 () 即可。',
          ],
          code: {
            lang: 'python',
            caption: 'yield 实现无限斐波那契',
            source: `def fib():
    a, b = 0, 1
    while True:
        yield a        # 交出一个值并暂停
        a, b = b, a + b

g = fib()
print([next(g) for _ in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# 生成器表达式：处理大文件不撑内存
total = sum(len(line) for line in open("big.txt"))`,
          },
        },
        {
          title: '9.3 什么时候用生成器',
          content: [
            '读大文件：for line in open(...) 本身就是生成器式的逐行读，百 G 日志也稳。',
            '数据管道：多个生成器首尾相接，读 → 过滤 → 转换 → 汇总，每步都不落盘、不驻留内存。',
            '无限序列：分页抓取、实时数据流，"边产生边消费"。',
            '反面教材：数据量小、要反复遍历、要按下标访问——这些场景请老老实实列表。',
          ],
          code: {
            lang: 'python',
            caption: '生成器管道：统计大日志中的 ERROR 行数',
            source: `def read_lines(path):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.strip()

def only_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

# 管道接通，逐行流过，内存占用恒定
errors = only_errors(read_lines("app.log"))
print(sum(1 for _ in errors))`,
          },
        },
      ],
      quiz: [
        {
          question: '函数中出现 yield 关键字后，调用该函数会立即执行函数体吗？',
          options: ['A. 会，和普通函数一样', 'B. 不会，返回一个生成器对象，next() 时才执行到 yield', 'C. 只执行到第一个 yield 前', 'D. 报错'],
          answer: 'B',
          explanation: '含 yield 的函数是生成器函数：调用只创建生成器，真正的代码在每次 next() 时推进到下一个 yield。',
        },
        {
          question: '(x*x for x in range(10**9)) 与 [x*x for x in range(10**9)] 的本质区别是？',
          answer: '前者是生成器（惰性，常数内存，随用随算）；后者是列表（立即算完 10 亿个数并全部存进内存）',
          explanation: '大数据或一次性遍历场景用生成器；需要下标访问或反复遍历时用列表。',
        },
        {
          question: 'for 循环遍历到末尾时，底层通过什么信号结束循环？',
          answer: '迭代器的 next() 抛出 StopIteration 异常，for 捕获后正常退出',
          explanation: '这正是迭代器协议：__iter__() 拿迭代器、next() 取值、StopIteration 表示结束。',
        },
      ],
    },
    {
      id: 'py-ch10',
      title: '第 10 章 装饰器',
      intro: '装饰器是 Python 最优雅的语法之一：不改原函数代码，就能给它加上计时、日志、权限检查等能力。理解了它，就读得懂 Flask、pytest 等框架的核心。',
      sections: [
        {
          title: '10.1 函数是一等公民',
          content: [
            'Python 中函数是"一等公民"：可以赋值给变量、当参数传递、当返回值返回——这是装饰器的前提。',
            '函数名不带括号是"函数对象本身"，带括号才是"调用它"。f = print 之后 f("hi") 等价 print("hi")。',
            '嵌套函数 + 返回函数 = 闭包：内层函数记住了外层作用域的变量。',
            '所以"把旧函数包装成新函数"完全可行：def wrapper(*args): 做点别的; return old_fn(*args)。',
          ],
          code: {
            lang: 'python',
            caption: '函数可以像数据一样传来传去',
            source: `def hello(name):
    return f"你好，{name}"

f = hello          # 函数赋值给变量
print(f("弈"))      # 你好，弈

def apply(func, value):   # 函数当参数
    return func(value)

print(apply(len, "code"))  # 4
print(apply(str.upper, "code"))  # CODE`,
          },
        },
        {
          title: '10.2 手写一个装饰器',
          content: [
            '`装饰器`就是一个"接收函数、返回新函数"的函数。计时装饰器是入门标配：包一层，前后各取一次时间。',
            '@timer 写在函数定义上方，等价于 say = timer(say)——这就是装饰器的全部魔法，只是语法糖。',
            '包装函数用 *args, **kwargs 接住任意参数，才能装饰任何签名的函数。',
            'functools.wraps 把原函数的名字、文档复制到包装函数上，写装饰器必带，否则函数元信息会丢。',
          ],
          code: {
            lang: 'python',
            caption: '一个能用的计时装饰器',
            source: `import time
from functools import wraps

def timer(func):
    @wraps(func)   # 保留原函数名与文档
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)   # 调原函数
        print(f"{func.__name__} 耗时 {time.time()-start:.3f}s")
        return result
    return wrapper

@timer            # 等价于 work = timer(work)
def work():
    time.sleep(1)

work()  # 输出：work 耗时 1.002s`,
          },
        },
        {
          title: '10.3 带参数的装饰器与典型用途',
          content: [
            '带参数的装饰器要再套一层：@repeat(3) 实际是 repeat(3) 先返回装饰器，再装饰函数——三层嵌套函数。',
            '典型用途：日志记录、权限校验、结果缓存（functools.lru_cache）、单元测试标记、Web 框架的路由注册。',
            'Flask 的 @app.route("/") 就是带参装饰器：把 URL 和处理函数绑定注册。',
            '多个装饰器从下往上贴：@a @b def f() 等价 f = a(b(f))，离函数最近的先包。',
          ],
          code: {
            lang: 'python',
            caption: '带参数的装饰器与缓存',
            source: `from functools import lru_cache

def repeat(n):                    # 第一层：收装饰器参数
    def decorator(func):          # 第二层：收函数
        def wrapper(*a, **kw):    # 第三层：收调用参数
            for _ in range(n):
                func(*a, **kw)
        return wrapper
    return decorator

@repeat(3)
def hi(): print("嗨")
hi()  # 嗨 嗨 嗨

@lru_cache(maxsize=None)   # 自带缓存装饰器
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)
print(fib(100))  # 瞬间完成（缓存避免重复计算）`,
          },
        },
      ],
      quiz: [
        {
          question: '@timer 写在函数定义上方，等价于什么？',
          options: ['A. timer() 函数被删除', 'B. work = timer(work)，即用装饰结果替换原函数名', 'C. 每次调用时临时计时', 'D. 给函数加注释'],
          answer: 'B',
          explanation: '@ 只是语法糖：函数定义完成后立刻把它传给装饰器，并用返回的新函数替换原名字绑定。',
        },
        {
          question: '装饰器的包装函数为什么写成 def wrapper(*args, **kwargs)？',
          answer: '为了接住任意位置参数和关键字参数，使装饰器能包装任何签名的函数',
          explanation: '这是通用装饰器的标准写法，参数原样透传给原函数，装饰器本身不关心具体参数。',
        },
        {
          question: 'functools.wraps 的作用是？',
          answer: '把原函数的 __name__、__doc__ 等元信息复制到包装函数上，避免装饰后函数"改名"',
          explanation: '不加 wraps，被装饰函数的 func.__name__ 会变成 "wrapper"，调试和文档都会混乱。',
        },
      ],
    },
    {
      id: 'py-ch11',
      title: '第 11 章 正则表达式',
      intro: 're 模块是 Python 处理文本的瑞士军刀：校验格式、批量提取、智能替换，一行正则顶三十行字符串判断。本章从语法到实战一次通关。',
      sections: [
        {
          title: '11.1 正则语法核心',
          content: [
            '字符类：\\d 数字、\\w 字母数字下划线、\\s 空白、. 任意字符；[abc] 三选一、[a-z] 范围、[^0-9] 取反。',
            '量词：* 零或多、+ 一或多、? 零或一、{n} 正好 n 个、{n,} 至少 n、{n,m} 区间。默认贪婪，加 ? 变懒惰（如 .*?）。',
            '锚点与分组：^ 开头、$ 结尾、\\b 单词边界；() 分组可捕获，| 表示或。',
            'Python 里写正则推荐原始字符串 r"\\d+"，前面的 r 让反斜杠不用双写，清爽又不易错。',
          ],
          code: {
            lang: 'python',
            caption: '常见模式速查',
            source: `import re

phone = r"1[3-9]\\d{9}"          # 手机号
email = r"[\\w.]+@[\\w.]+\\.\\w+" # 邮箱
chinese = r"[\\u4e00-\\u9fa5]+"   # 中文
number = r"-?\\d+\\.?\\d*"         # 整数或小数

print(re.fullmatch(phone, "13812345678"))  # 匹配成功返回对象`,
          },
        },
        {
          title: '11.2 re 模块四大函数',
          content: [
            '`re.match` 从字符串开头匹配（只能验开头）；`re.search` 全文找第一个匹配；`re.fullmatch` 要求整串完全符合——校验用 fullmatch 最严格。',
            '`re.findall` 返回所有匹配的列表，提取场景一把梭：re.findall(r"\\d+", text) 抓出所有数字。',
            '`re.sub` 正则替换：re.sub(r"\\d+", "*", "电话138") 把数字打码；替换串里 \\1 引用捕获组。',
            '匹配对象的方法：m.group() 整个匹配、m.group(1) 第一组、m.start()/.end() 位置、m.span() 区间。',
          ],
          code: {
            lang: 'python',
            caption: '四大函数实战',
            source: `import re

log = "订单A102金额88元，订单B205金额120元"

print(re.search(r"\\d+", log).group())   # 102（第一个数字）
print(re.findall(r"[A-Z]\\d+", log))     # ['A102', 'B205']
print(re.findall(r"(\\w+)金额(\\d+)元", log))
# [('订单A102', '88'), ('订单B205', '120')]

print(re.sub(r"\\d+元", "**元", log))    # 金额打码`,
          },
        },
        {
          title: '11.3 编译复用与常见坑',
          content: [
            '同一模式反复用时 re.compile 预编译：p = re.compile(r"\\d+")，之后 p.findall(s)，循环里省时明显。',
            '贪婪陷阱："<a>x</a><b>y</b>" 用 <.+> 会一口气匹配到最后一对标签；改 <.+?> 懒惰匹配才是一对一对的。',
            '匹配换行：默认 . 不匹配 \\n，加 re.S 标志（re.DOTALL）后才匹配。',
            'raw 字符串里也别忘记：正则引擎和 Python 字符串各转义一次，所以永远用 r"..." 前缀最省心。',
          ],
          code: {
            lang: 'python',
            caption: '预编译与懒惰匹配',
            source: `import re

html = "<p>第一段</p><p>第二段</p>"

print(re.findall(r"<p>.+</p>", html))   # ['<p>第一段</p><p>第二段</p>'] 贪婪！
print(re.findall(r"<p>.+?</p>", html))  # ['<p>第一段</p>', '<p>第二段</p>']

pattern = re.compile(r"ERROR: (.+)")    # 预编译
for line in open("app.log", encoding="utf-8"):
    m = pattern.search(line)
    if m: print(m.group(1))             # 只打印错误内容`,
          },
        },
      ],
      quiz: [
        {
          question: 're.match 与 re.search 的区别是？',
          options: ['A. 完全一样', 'B. match 只从字符串开头匹配，search 在全文中查找第一个匹配', 'C. match 更快', 'D. search 只匹配一次'],
          answer: 'B',
          explanation: '"hello123" 用 match(r"\\d+") 找不到（开头不是数字），search 能找到 123。',
        },
        {
          question: '正则 <.+> 匹配 "<a>x</a><b>y</b>" 会吞掉整串，修正办法是？',
          answer: '改为懒惰匹配 <.+?>，量词后加 ? 表示"能少匹配就少匹配"',
          explanation: '贪婪（默认）尽量多吃，懒惰尽量少碰。提取成对标签场景必须用懒惰模式。',
        },
        {
          question: 'Python 中写正则表达式为什么推荐 r"\\d+" 而不是 "\\d+"？',
          answer: 'r 前缀是原始字符串，反斜杠不被 Python 转义，避免和正则自身的转义冲突（普通字符串里 \\d 写法易错，\\b 会变退格符）',
          explanation: '例如 "\\b" 在普通字符串里是退格字符，正则想要单词边界必须写 r"\\b" 或 "\\\\b"——统一用 r 前缀最安全。',
        },
      ],
    },
    {
      id: 'py-ch12',
      title: '第 12 章 网络爬虫入门',
      intro: '爬虫 = 模拟浏览器请求网页 + 从 HTML 里提取数据。本章学会 requests 发请求、BeautifulSoup 解析页面，以及必须知道的合规常识。',
      sections: [
        {
          title: '12.1 requests 发送请求',
          content: [
            '`HTTP 请求`是与网站对话的方式：GET 取数据（浏览器输网址就是 GET），POST 提交数据（登录、发表单）。',
            'requests 是 Python 最流行的 HTTP 库（pip install requests）：r = requests.get(url)，r.text 拿网页源码，r.status_code 看状态码。',
            '状态码速记：200 成功、301/302 跳转、403 被拒绝、404 不存在、500 服务器出错。',
            'headers 里带上 User-Agent 伪装成浏览器，很多网站才肯给你完整内容；timeout=10 防止程序卡死。',
          ],
          code: {
            lang: 'python',
            caption: '最简爬虫骨架',
            source: `import requests

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
r = requests.get("https://example.com", headers=headers, timeout=10)

print(r.status_code)   # 200 表示成功
print(r.encoding)      # 自动识别的编码
r.encoding = "utf-8"   # 乱码就手动指定
print(r.text[:200])    # 网页源码前 200 字符

# JSON 接口更方便：data = requests.get(api_url).json()`,
          },
        },
        {
          title: '12.2 BeautifulSoup 解析 HTML',
          content: [
            '网页源码是一大串 HTML，`BeautifulSoup`（pip install beautifulsoup4）把它解析成可以查询的节点树。',
            '创建：soup = BeautifulSoup(html, "html.parser")。查找：soup.find("h1") 找第一个、soup.find_all("a") 找全部、soup.select(".item") 用 CSS 选择器。',
            '取内容：tag.text 纯文本、tag.get("href") 取属性、tag["class"] 也行。',
            '定位技巧：先在浏览器 F12 里右键元素"检查"，看清它的标签、class、层级，再写选择器——爬虫的八成工作在分析页面。',
          ],
          code: {
            lang: 'python',
            caption: '提取页面中所有文章标题和链接',
            source: `from bs4 import BeautifulSoup

html = """<div class="post">
  <a href="/p/1"><h2>第一篇</h2></a></div>
<div class="post"><a href="/p/2"><h2>第二篇</h2></a></div>"""

soup = BeautifulSoup(html, "html.parser")
for a in soup.select(".post a"):
    print(a.text.strip(), "->", a["href"])
# 第一篇 -> /p/1
# 第二篇 -> /p/2`,
          },
        },
        {
          title: '12.3 合规与反爬常识',
          content: [
            '`robots.txt` 是网站的"爬虫告示牌"（域名后加 /robots.txt 可看），写明哪些路径不欢迎抓取，请尊重它。',
            '频率控制：time.sleep(1) 给每次请求间隔，别把人家服务器压垮——高并发抓取可能构成攻击。',
            '版权与法律：公开数据可学习性抓取，但个人信息、付费内容、明确禁止的内容不要碰；商用前务必确认授权。',
            '反爬信号：返回 403、要求验证码、数据在 JS 里动态加载（requests 拿不到）——后者要用 Selenium 或找数据接口。',
          ],
          code: {
            lang: 'python',
            caption: '礼貌爬虫三件套',
            source: `import requests, time

urls = ["https://example.com/a", "https://example.com/b"]
for url in urls:
    try:
        r = requests.get(url, headers={"User-Agent": "MyStudyBot/1.0"}, timeout=10)
        if r.status_code == 200:
            print(url, "OK", len(r.text), "字节")
        else:
            print(url, "被拒绝", r.status_code)
    except requests.RequestException as e:
        print(url, "出错", e)
    time.sleep(1)   # 间隔 1 秒，文明抓取`,
          },
        },
      ],
      quiz: [
        {
          question: 'requests.get(url) 返回 403 状态码意味着？',
          options: ['A. 网页不存在', 'B. 服务器拒绝访问（可能被识别为爬虫）', 'C. 网络断开', 'D. 请求成功'],
          answer: 'B',
          explanation: '403 Forbidden 表示服务器拒绝。常见原因是缺少 User-Agent 或访问过快触发反爬。',
        },
        {
          question: 'BeautifulSoup 中 soup.select(".post a") 的选择器含义是？',
          answer: '选中所有 class 含 post 的元素内部的 <a> 标签（后代选择器）',
          explanation: 'CSS 选择器语法：. 表示 class，空格表示后代关系，与浏览器里的规则一致。',
        },
        {
          question: '页面数据由 JavaScript 动态加载时，requests 直接 get 为什么拿不到数据？',
          answer: 'requests 只下载原始 HTML，不执行 JS；动态数据在 JS 运行后才出现，需改用 Selenium 或直接请求数据接口',
          explanation: '判断方法：浏览器"查看网页源代码"里搜不到目标数据，而在 F12 的 Elements 里能看到，即为动态渲染。',
        },
      ],
    },
    {
      id: 'py-ch13',
      title: '第 13 章 面向对象进阶',
      intro: '上一阶段学会了定义类和对象，本章进阶：继承复用代码、类方法与静态方法的分工、@property 优雅地管理属性、以及 Python 特有的鸭子类型哲学。',
      sections: [
        {
          title: '13.1 继承与 super()',
          content: [
            '`继承`：class Dog(Animal) 让 Dog 自动拥有 Animal 的属性和方法，只写自己新增或修改的部分。',
            '子类重写父类方法后，用 `super()` 还能调用父类版本：super().__init__(name) 是子类构造方法里的标配。',
            '方法解析顺序 MRO：Python 支持多继承，class C(A, B) 中同名方法按从左到右的深度优先规则查找，C.__mro__ 可查。',
            'isinstance(d, Animal) 判断对象是不是某类（含子类）的实例；issubclass(Dog, Animal) 判断类之间的继承关系。',
          ],
          code: {
            lang: 'python',
            caption: '继承与 super',
            source: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # 父类部分交给父类初始化
        self.breed = breed
    def speak(self):             # 重写
        return "汪汪"

d = Dog("旺财", "金毛")
print(d.name, d.speak())              # 旺财 汪汪
print(isinstance(d, Animal))          # True`,
          },
        },
        {
          title: '13.2 类方法、静态方法与 @property',
          content: [
            '`实例方法`第一个参数是 self（操作某个对象）；`@classmethod` 第一个参数是 cls（操作类本身），常用于"另一种构造方式"。',
            '`@staticmethod` 没有 self/cls，就是个挂在类里的普通函数，用来组织与类相关的工具方法。',
            '`@property` 把方法伪装成属性：p.area 而不是 p.area()，还能在读取/赋值时加校验逻辑。',
            'setter 写法：@area.setter 定义赋值逻辑，p.area = -5 时可以在里面拒绝非法值。',
          ],
          code: {
            lang: 'python',
            caption: '三种方法与属性装饰器',
            source: `class Circle:
    pi = 3.14159
    def __init__(self, r): self.r = r

    @classmethod
    def from_diameter(cls, d):     # 备用构造器
        return cls(d / 2)

    @staticmethod
    def is_valid(r): return r > 0  # 工具函数

    @property
    def area(self):                # 像属性一样访问
        return Circle.pi * self.r ** 2

c = Circle.from_diameter(10)
print(c.area)        # 78.5397，注意没有括号`,
          },
        },
        {
          title: '13.3 鸭子类型与抽象',
          content: [
            '`鸭子类型`：Python 不看继承看行为——"走像鸭子、叫像鸭子，就是鸭子"。任何有 speak() 的对象都能放进需要 speak 的地方。',
            '这意味着 Python 很少强制接口：只要对象提供了需要的方法即可，比 Java 灵活但也更依赖文档与约定。',
            '需要正式约束时用 abc 模块的抽象基类：@abstractmethod 标记的方法子类必须实现，否则不能实例化。',
            '混合使用：简单场景鸭子类型，框架级代码用抽象基类划清契约。',
          ],
          code: {
            lang: 'python',
            caption: '鸭子类型与抽象基类',
            source: `from abc import ABC, abstractmethod

# 鸭子类型：不用继承同一个父类
class Duck:  def speak(self): return "嘎"
class Radio: def speak(self): return "FM96.8"

def make_it_speak(x): print(x.speak())  # 只要有 speak 就行
make_it_speak(Duck())
make_it_speak(Radio())

# 抽象基类：强制契约
class Shape(ABC):
    @abstractmethod
    def area(self): ...

class Square(Shape):
    def __init__(self, a): self.a = a
    def area(self): return self.a ** 2

# Shape() 会报错；Square 不实现 area 也会报错`,
          },
        },
      ],
      quiz: [
        {
          question: '子类的 __init__ 中调用 super().__init__(name) 的目的是？',
          answer: '把父类负责的初始化工作交给父类完成，子类只初始化自己新增的部分',
          explanation: '避免重复代码，也保证父类定义的字段（如 self.name）被正确建立。',
        },
        {
          question: '被 @property 装饰的方法，调用时的写法特点是？',
          options: ['A. 必须带括号 c.area()', 'B. 像访问属性一样 c.area，不加括号', 'C. 只能通过类名调用', 'D. 不能返回值'],
          answer: 'B',
          explanation: '@property 把方法伪装成属性，外部用 c.area 访问；配合 @area.setter 还能拦截赋值做校验。',
        },
        {
          question: 'Python 的"鸭子类型"指的是？',
          answer: '不检查对象的类或继承关系，只关心它是否提供了所需的方法（行为）',
          explanation: '"走像鸭子、叫像鸭子就是鸭子"——有 speak() 的对象都能传给需要 speak 的函数，与继承无关。',
        },
      ],
    },
    {
      id: 'py-ch14',
      title: '第 14 章 测试与调试',
      intro: '代码能跑 ≠ 代码正确。本章学会用 assert 快速验证、用 unittest 写正式测试、用 pdb 和日志高效调试——这些习惯会让你的代码质量脱胎换骨。',
      sections: [
        {
          title: '14.1 assert 断言与防御式编程',
          content: [
            '`assert 条件` 是最轻量的自检：条件不成立立刻抛 AssertionError 并停下，把 bug 暴露在离源头最近的地方。',
            '适合检查"绝不应该发生"的情况：函数入口参数合法性、计算中间结果的范围。',
            'assert 可以带提示信息：assert age >= 0, f"年龄不能为负: {age}"，出错时信息随异常打印。',
            '注意：python -O 优化模式下所有 assert 会被移除，所以别用它做正式的数据校验（用 if + raise）。',
          ],
          code: {
            lang: 'python',
            caption: 'assert 快速自检',
            source: `def average(scores):
    assert len(scores) > 0, "成绩列表不能为空"
    return sum(scores) / len(scores)

print(average([80, 90]))   # 85.0
# average([])  # AssertionError: 成绩列表不能为空

# 验证计算中间结果
price = 99.9
discount = 0.8
final = price * discount
assert 0 < final <= price   # 折后价必须合理`,
          },
        },
        {
          title: '14.2 unittest 单元测试',
          content: [
            '`单元测试`是针对最小功能单元（一个函数/方法）的自动化测试：写一次，以后每次改代码跑一遍，回归 bug 立刻现形。',
            'unittest 是标准库：继承 TestCase，测试方法以 test_ 开头，用 self.assertEqual(a, b)、assertTrue、assertRaises 等断言。',
            'setUp 方法在每个测试前自动执行，用来准备公共数据；tearDown 做清理。',
            '运行：python -m unittest test_calc.py -v。全绿安心，一红立刻定位。pytest 是更流行的第三方替代品，语法更简洁。',
          ],
          code: {
            lang: 'python',
            caption: '一个完整的 unittest 测试文件',
            source: `import unittest

def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为 0")
    return a / b

class TestDivide(unittest.TestCase):
    def test_normal(self):
        self.assertEqual(divide(10, 2), 5)

    def test_float(self):
        self.assertAlmostEqual(divide(1, 3), 0.3333, places=4)

    def test_zero(self):           # 验证"该报错时报错"
        with self.assertRaises(ValueError):
            divide(1, 0)

if __name__ == "__main__":
    unittest.main()`,
          },
        },
        {
          title: '14.3 调试三板斧：print、pdb、日志',
          content: [
            'print 调试：最朴素也最快，但记得给输出加标签 print("DEBUG x =", x)，完事要删干净。',
            '`pdb` 是内置断点调试器：代码里插 breakpoint()，运行到那儿暂停，n 单步、p 变量名 查看、c 继续——比狂塞 print 专业得多。',
            '`logging` 模块是 print 的正式替代：分 DEBUG/INFO/WARNING/ERROR 级别，可统一开关、可写文件，项目代码都用它。',
            '调试心法：先复现 → 缩小范围（二分注释代码）→ 定位最小出错点 → 修复后补一个测试防止复发。',
          ],
          code: {
            lang: 'python',
            caption: 'logging 与断点调试',
            source: `import logging
logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)s %(message)s")

def calc(n):
    logging.debug(f"收到 n={n}")   # 调试信息
    result = 100 / n
    logging.info(f"结果 {result}")
    return result

calc(5)

# 断点调试：在可疑处插入
# breakpoint()   # 运行到这里进入交互调试，输入 n/print(x)/c 控制`,
          },
        },
      ],
      quiz: [
        {
          question: 'assert 和 if + raise 的关键区别是？',
          options: ['A. 没有区别', 'B. assert 在 -O 优化模式下会被整体移除，正式校验必须用 if + raise', 'C. assert 更快', 'D. raise 不能带消息'],
          answer: 'B',
          explanation: 'assert 是"开发期自检"，可被执行选项关闭；面向用户的输入校验必须用 if + raise 保证永远生效。',
        },
        {
          question: 'unittest 中被识别为测试用例的方法命名规则是？',
          answer: '方法名以 test_ 开头（如 test_add），且方法定义在继承 unittest.TestCase 的类里',
          explanation: '测试框架按命名约定自动发现用例；setUp/tearDown 会在每个 test_ 方法前后自动执行。',
        },
        {
          question: '相比满屏 print，logging 模块的两个优势是？',
          answer: '可按级别（DEBUG/INFO/…）统一开关输出；可同时输出到控制台和文件，且无需删除调试代码',
          explanation: '改 level 即可静默全部调试输出；print 则要在上线前逐条删除，极易漏。',
        },
      ],
    },
    {
      id: 'py-ch15',
      title: '第 15 章 综合实战：命令行通讯录',
      intro: '把前面十五章的知识组装起来：字典存数据、文件持久化、函数拆分、异常兜底——做一个真正能用的命令行通讯录，体验"从零到一"的完整开发流程。',
      sections: [
        {
          title: '15.1 需求分析与数据设计',
          content: [
            '先想清楚再动手：通讯录要支持 增、删、查、改、列出全部、退出 六个功能，数据要能保存到文件下次接着用。',
            '数据结构设计：用字典嵌套——{姓名: {"phone": ..., "email": ...}}，查找 O(1)，天然去重。',
            '持久化方案：JSON 文件。程序启动时 load，每次修改后 dump，数据随关随存。',
            '功能拆分：每个功能一个函数，main() 里只放菜单循环——这是"单一职责"的最小实践。',
          ],
          code: {
            lang: 'python',
            caption: '骨架：菜单循环与数据加载',
            source: `import json, os

DATA_FILE = "contacts.json"

def load():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}

def save(contacts):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, ensure_ascii=False, indent=2)`,
          },
        },
        {
          title: '15.2 核心功能实现',
          content: [
            '增改合一：contacts[name] = info 既是新增也是覆盖更新，配合 if name in contacts 给出不同提示。',
            '删除用 pop(name, None)：第二参数避免键不存在时报 KeyError，返回 None 时表示"没找到这个人"。',
            '查询支持模糊匹配：遍历字典，if keyword in name 的都列出，体验比精确匹配好。',
            '每个修改操作后立即 save()，崩溃也不丢数据——宁可多写盘，不可丢数据。',
          ],
          code: {
            lang: 'python',
            caption: '增删查改四个函数',
            source: `def add(contacts, name, phone):
    action = "更新" if name in contacts else "新增"
    contacts[name] = {"phone": phone}
    save(contacts)
    print(f"已{action}：{name}")

def delete(contacts, name):
    if contacts.pop(name, None) is None:
        print("查无此人")
    else:
        save(contacts)
        print(f"已删除：{name}")

def search(contacts, keyword):
    found = {n: i for n, i in contacts.items() if keyword in n}
    for n, i in found.items():
        print(f"{n}: {i['phone']}")
    print(f"共 {len(found)} 条")`,
          },
        },
        {
          title: '15.3 健壮性收尾与扩展方向',
          content: [
            '输入校验：手机号用正则 ^1[3-9]\\d{9}$ 挡掉乱填；空名字直接拒绝。',
            '异常兜底：菜单主循环包 try/except，单条命令出错不崩整个程序。',
            '扩展练习：加 email 字段、按姓名排序导出 CSV、用 argparse 支持命令行参数、给查询加分页。',
            '项目虽小五脏俱全：数据层（JSON 文件）、逻辑层（功能函数）、界面层（菜单循环）——三层结构放大就是真实软件架构。',
          ],
          code: {
            lang: 'python',
            caption: '带校验与异常保护的菜单循环',
            source: `import re

def main():
    contacts = load()
    menu = {"1": "新增/更新", "2": "删除", "3": "查询", "4": "全部", "0": "退出"}
    while True:
        for k, v in menu.items(): print(k, v)
        try:
            choice = input("请选择: ").strip()
            if choice == "0": break
            elif choice == "1":
                name = input("姓名: ").strip()
                phone = input("手机号: ").strip()
                if not name: print("姓名不能为空"); continue
                if not re.fullmatch(r"1[3-9]\\d{9}", phone):
                    print("手机号格式不对"); continue
                add(contacts, name, phone)
            # ... 其余分支省略
        except Exception as e:
            print("操作失败:", e)   # 单条命令出错不崩溃

main()`,
          },
        },
      ],
      quiz: [
        {
          question: 'contacts.pop(name, None) 中第二参数 None 的作用是？',
          options: ['A. 删除后把值设为 None', 'B. 键不存在时返回 None 而不是抛 KeyError', 'C. 清空整个字典', 'D. 没有作用'],
          answer: 'B',
          explanation: 'pop 的默认值参数让"删除不存在的人"成为正常分支而非异常，配合返回值判断即可给出友好提示。',
        },
        {
          question: '把修改后的数据立即写入 JSON 文件的主要目的是？',
          answer: '持久化：防止程序崩溃或退出后数据丢失，下次启动可重新 load 恢复',
          explanation: '内存中的数据断电即失；每次修改后 save 是最简单可靠的持久化策略。',
        },
        {
          question: '通讯录项目体现的"三层结构"是？',
          answer: '数据层（JSON 文件读写）→ 逻辑层（增删查改函数）→ 界面层（菜单循环），层层之间单向调用',
          explanation: '分层让每层职责单一、可独立替换：比如把 JSON 换成数据库时，逻辑层和界面层一行不用改。',
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
    // ===== 第 7~15 章配套练习 =====
    {
      id: 'py-e25', type: 'choice', title: 'with 语句的好处', difficulty: 2, tags: ['第7章', '文件'],
      question: 'with open("a.txt") as f: 相比 f = open("a.txt") 的最大优势是？',
      options: ['A. 读取更快', 'B. 出了 with 块自动关闭文件，异常也不泄漏', 'C. 不用指定编码', 'D. 支持更多格式'],
      answer: 'B',
      explanation: 'with 是上下文管理器协议：无论正常结束还是中途异常，__exit__ 都会关闭文件。',
    },
    {
      id: 'py-e26', type: 'coding', title: '编程：JSON 风格统计', difficulty: 3, tags: ['第7章', '文件与模块'],
      question: '给定成绩字典 scores = {"弈": 92, "明": 58, "华": 85}，找出最高分者的姓名并输出 "最高分: 弈 92"（提示：max 配 key 参数）。',
      starterCode: `scores = {"弈": 92, "明": 58, "华": 85}
# 找出最高分者并输出：最高分: 弈 92
`,
      expectedOutput: '最高分: 弈 92\n',
      answer: 'top = max(scores, key=scores.get)；print(f"最高分: {top} {scores[top]}")',
      explanation: 'max(dict, key=dict.get) 按键对应的值找最大键，是字典统计的惯用套路。',
      hints: ['max(scores, key=scores.get)', 'f-string 输出'],
    },
    {
      id: 'py-e27', type: 'choice', title: 'randint 的范围', difficulty: 2, tags: ['第8章', '标准库'],
      question: 'random.randint(1, 10) 可能生成的最大值是？',
      options: ['A. 9', 'B. 10', 'C. 11', 'D. 1'],
      answer: 'B',
      explanation: 'randint 是闭区间含两端，与 range(1, 10) 不含 10 相反——高频考点。',
    },
    {
      id: 'py-e28', type: 'coding', title: '编程：Counter 词频统计', difficulty: 3, tags: ['第8章', '标准库'],
      question: '不用 Counter 也能体会其思想：统计 "apple banana apple orange apple banana" 中各单词出现次数，按出现次数从多到少输出每行 "单词 次数"（apple 3、banana 2、orange 1）。',
      starterCode: `words = "apple banana apple orange apple banana".split()
# 用字典统计词频，按次数降序输出 "单词 次数"
`,
      expectedOutput: 'apple 3\nbanana 2\norange 1\n',
      answer: 'd = {}; for w in words: d[w] = d.get(w, 0) + 1；再 sorted(d.items(), key=lambda x: -x[1]) 遍历输出。',
      explanation: 'd.get(w, 0) + 1 是计数器的手写版；Counter(words).most_common() 一行等价。排序用次数的负数实现降序。',
      hints: ['d[w] = d.get(w, 0) + 1', 'sorted(d.items(), key=lambda x: -x[1])'],
    },
    {
      id: 'py-e29', type: 'fill', title: 'yield 的执行时机', difficulty: 3, tags: ['第9章', '生成器'],
      question: '含 yield 的函数被调用时，函数体会立即执行吗？生成器相比列表在内存上的优势是？',
      answer: '不会：调用只返回生成器对象，每次 next() 才推进到下一个 yield；生成器惰性求值，任意时刻只持有当前元素，内存占用恒定',
      explanation: '这就是生成器能处理无限序列和超大文件的原因——现用现算，不落全部数据。',
    },
    {
      id: 'py-e30', type: 'coding', title: '编程：生成器版斐波那契', difficulty: 4, tags: ['第9章', '生成器'],
      question: '写一个生成器函数 fib() 用 yield 依次产出斐波那契数列，取前 10 项求和并输出（0,1,1,2,3,5,8,13,21,34 的和为 88）。',
      starterCode: `def fib():
    a, b = 0, 1
    while True:
        # 用 yield 产出 a，再更新 a, b
        pass

# 取前 10 项求和输出
`,
      expectedOutput: '88\n',
      answer: 'yield a 后 a, b = b, a + b；取值用 g = fib() 再 sum(next(g) for _ in range(10))。',
      explanation: 'yield 让函数在产出值后暂停，下次 next 从暂停处继续——无限数列也能安全定义。',
      hints: ['yield a', 'a, b = b, a + b', 'sum(next(g) for _ in range(10))'],
    },
    {
      id: 'py-e31', type: 'fill', title: '装饰器等价式', difficulty: 3, tags: ['第10章', '装饰器'],
      question: '@timer 写在 def work(): 上方，等价于哪句赋值？包装函数为什么写成 wrapper(*args, **kwargs)？',
      answer: '等价于 work = timer(work)；*args, **kwargs 接住任意参数，使装饰器能包装任何签名的函数',
      explanation: '@ 只是语法糖：函数定义后立刻传给装饰器并用返回值替换原名绑定。',
    },
    {
      id: 'py-e32', type: 'coding', title: '编程：手写计数装饰器', difficulty: 4, tags: ['第10章', '装饰器'],
      question: '不用装饰器语法，手动实现其等价逻辑：写函数 call3(func) 让传入的函数执行 3 次。对 hello()（打印 "hi"）使用后输出三行 hi。',
      starterCode: `def call3(func):
    def wrapper():
        # 调用 func() 三次
        pass
    return wrapper

def hello():
    print("hi")

# 用 call3 包装 hello 并调用
`,
      expectedOutput: 'hi\nhi\nhi\n',
      answer: 'wrapper 里 for _ in range(3): func()；最后 hello3 = call3(hello); hello3()。',
      explanation: 'hello3 = call3(hello) 就是 @call3 的本质——装饰器只是这句赋值的语法糖。',
      hints: ['for _ in range(3): func()', 'hello3 = call3(hello) 然后 hello3()'],
    },
    {
      id: 'py-e33', type: 'choice', title: 'match 与 search', difficulty: 3, tags: ['第11章', '正则'],
      question: '对 "hello123" 使用 re.match(r"\\d+", s) 的结果是？',
      options: ['A. 匹配到 123', 'B. None——match 只从开头匹配，开头不是数字', 'C. 报错', 'D. 匹配到 hello'],
      answer: 'B',
      explanation: 'match 只从字符串开头尝试；全文查找要用 search 或 findall。',
    },
    {
      id: 'py-e34', type: 'coding', title: '编程：提取数字求和', difficulty: 3, tags: ['第11章', '正则'],
      question: '用 re.findall 从 "苹果12个，香蕉30个，橙子8个" 中提取所有数字并求和输出（12+30+8=50）。',
      starterCode: `import re
text = "苹果12个，香蕉30个，橙子8个"
# 提取所有数字求和输出
`,
      expectedOutput: '50\n',
      answer: 'nums = re.findall(r"\\d+", text) 得到字符串列表，sum(map(int, nums)) 求和输出。',
      explanation: 'findall 返回的是字符串，求和前必须 int 转换——map(int, ...) 批量转换最简洁。',
      hints: ['re.findall(r"\\d+", text)', 'sum(map(int, nums))'],
    },
    {
      id: 'py-e35', type: 'choice', title: '403 状态码', difficulty: 2, tags: ['第12章', '爬虫'],
      question: '爬虫收到 HTTP 403 状态码，意味着？',
      options: ['A. 网页不存在', 'B. 服务器拒绝访问（可能触发反爬）', 'C. 请求成功', 'D. 需要重定向'],
      answer: 'B',
      explanation: '403 Forbidden：服务器拒绝。常见原因：缺 User-Agent、频率过高。404 才是不存在。',
    },
    {
      id: 'py-e36', type: 'fill', title: '爬虫合规', difficulty: 2, tags: ['第12章', '爬虫'],
      question: 'robots.txt 是什么？requests 拿不到、但浏览器里能看到的数据，说明页面用了什么技术？',
      answer: 'robots.txt 是网站的爬虫告示牌，声明不欢迎抓取的路径；JS 动态渲染——需 Selenium 或直接请求数据接口',
      explanation: '判断方法：右键"查看网页源代码"搜不到目标数据而 F12 Elements 里能看到，即为动态加载。',
    },
    {
      id: 'py-e37', type: 'coding', title: '编程：继承与面积', difficulty: 4, tags: ['第13章', '面向对象'],
      question: '定义 Shape 基类（含 name 属性）和子类 Circle（半径 r，area() 返回 3.14*r*r）。创建 r=2 的 Circle，输出 "Circle 面积: 12.56"。',
      starterCode: `class Shape:
    def __init__(self, name):
        self.name = name

class Circle(Shape):
    def __init__(self, r):
        # 调用父类构造传入 "Circle"，再存半径
        pass
    def area(self):
        pass

c = Circle(2)
# 输出：Circle 面积: 12.56
`,
      expectedOutput: 'Circle 面积: 12.56\n',
      answer: 'super().__init__("Circle")；self.r = r；area 返回 3.14 * self.r ** 2；print(f"{c.name} 面积: {c.area()}")。',
      explanation: 'super().__init__ 把父类字段交给父类初始化；c.name 继承自 Shape。',
      hints: ['super().__init__("Circle")', '3.14 * self.r ** 2', 'f"{c.name} 面积: {c.area()}"'],
    },
    {
      id: 'py-e38', type: 'choice', title: '@property 的调用', difficulty: 3, tags: ['第13章', '面向对象'],
      question: '被 @property 装饰的 area 方法，外部调用的写法是？',
      options: ['A. c.area()', 'B. c.area（像属性一样，不加括号）', 'C. Circle.area()', 'D. property(c.area)'],
      answer: 'B',
      explanation: '@property 把方法伪装成属性访问；配 @area.setter 还能在赋值时校验。',
    },
    {
      id: 'py-e39', type: 'choice', title: 'assert vs raise', difficulty: 3, tags: ['第14章', '测试调试'],
      question: '为什么正式的用户输入校验不能用 assert？',
      options: ['A. assert 太慢', 'B. python -O 优化模式下 assert 会被整体移除', 'C. assert 不能带消息', 'D. assert 只能用于数字'],
      answer: 'B',
      explanation: 'assert 是开发期自检，可被 -O 关闭；面向用户的校验必须 if + raise 保证永远生效。',
    },
    {
      id: 'py-e40', type: 'fill', title: 'unittest 约定', difficulty: 2, tags: ['第14章', '测试调试'],
      question: 'unittest 中测试类和测试方法的命名约定是什么？setUp 方法何时执行？',
      answer: '测试类继承 unittest.TestCase；测试方法以 test_ 开头；setUp 在每个测试方法运行前自动执行',
      explanation: '框架按命名约定自动发现用例；setUp/tearDown 负责每个用例前后的准备与清理。',
    },
    {
      id: 'py-e41', type: 'coding', title: '编程：迷你通讯录查询', difficulty: 4, tags: ['第15章', '综合'],
      question: '实现通讯录模糊查询：contacts = {"张三": "138", "张四": "139", "李五": "137"}，查询关键字 "张"，按字典序输出每个匹配项 "姓名: 电话"。',
      starterCode: `contacts = {"张三": "138", "张四": "139", "李五": "137"}
keyword = "张"
# 模糊匹配并排序输出 "姓名: 电话"
`,
      expectedOutput: '张三: 138\n张四: 139\n',
      answer: 'for name in sorted(contacts): if keyword in name: print(f"{name}: {contacts[name]}")',
      explanation: 'keyword in name 做子串模糊匹配；sorted(contacts) 按姓名排序输出，对应第 15 章通讯录项目的查询功能。',
      hints: ['if keyword in name', 'sorted(contacts) 排序'],
    },
    {
      id: 'py-e42', type: 'fill', title: 'pop 的默认值', difficulty: 3, tags: ['第15章', '综合'],
      question: 'contacts.pop(name, None) 中第二参数 None 起什么作用？为什么删除场景要用它？',
      answer: '键不存在时返回 None 而不是抛 KeyError；删除"可能不存在的人"时可用返回值区分情况给出友好提示',
      explanation: '带默认值的 pop 把异常分支变成正常分支，是字典删除的健壮写法。',
    },
  ],
}
