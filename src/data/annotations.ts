/**
 * 名词批注（解释栏）数据
 * key: 章节 id；value: 与该章 sections 一一对应的数组，
 * 每个元素是该小节右侧"批注栏"中要解释的专业名词列表。
 * 批注像旁注一样紧贴对应小节渲染，不是独立模块。
 */
export interface TermNote {
  term: string   // 专业名词
  def: string    // 解释（1~3 句，通俗但准确）
}

export const annotations: Record<string, TermNote[][]> = {
  // ======================= Java =======================
  'java-ch1': [
    [ // 1.1 Java 是什么
      { term: '高级语言', def: '接近人类自然语言的编程语言，需要经过翻译（编译或解释）才能被计算机执行。Java、Python、C++ 都是高级语言，与之相对的是机器语言和汇编语言。' },
      { term: '编译（Compile）', def: '把源代码一次性整体翻译成目标代码的过程。Java 先把 .java 源文件编译成 .class 字节码文件，再由虚拟机执行。' },
      { term: '跨平台', def: '同一份程序不经修改就能在 Windows、macOS、Linux 等不同操作系统上运行。Java 靠"一次编译，到处运行"的字节码机制实现跨平台。' },
      { term: '面向对象（OOP）', def: '一种编程思想：把数据和操作数据的方法封装成"对象"，通过类、继承、多态组织代码。Java 是典型的面向对象语言。' },
    ],
    [ // 1.2 JDK、JRE 与 JVM 的关系
      { term: 'JDK', def: 'Java Development Kit，Java 开发工具包。包含编译器 javac、运行时 JRE 和一堆开发工具，写 Java 程序必须安装它。' },
      { term: 'JRE', def: 'Java Runtime Environment，Java 运行时环境。只负责"运行"Java 程序，包含 JVM 和核心类库，不能用来开发。' },
      { term: 'JVM', def: 'Java Virtual Machine，Java 虚拟机。它是字节码的"翻译官"，把 .class 文件翻译成当前操作系统的机器指令，是跨平台的核心。' },
      { term: '字节码（Bytecode）', def: 'Java 源码编译后的中间产物（.class 文件），不是机器码，而是一种与平台无关的指令格式，由 JVM 解释执行。' },
      { term: 'javac', def: 'JDK 自带的编译器命令，用法 javac Hello.java，把源文件编译成字节码文件。' },
    ],
    [ // 1.3 main 方法详解
      { term: '入口方法', def: '程序开始执行的位置。Java 规定入口必须是 public static void main(String[] args)，写法一个字母都不能错。' },
      { term: 'public', def: '访问修饰符，表示"公开的"，任何类都能访问。main 方法必须是 public，否则 JVM 找不到它。' },
      { term: 'static', def: '静态修饰符，表示该方法属于类本身而不是某个对象。main 必须 static，因为程序启动时还没有创建任何对象。' },
      { term: 'void', def: '返回类型，表示"什么都不返回"。main 方法执行完就结束了，不需要返回值。' },
      { term: 'String[] args', def: 'main 方法的参数：一个字符串数组，保存命令行传入的参数。args 是习惯命名，可以换成别的名字。' },
    ],
  ],
  'java-ch2': [
    [ // 2.1 八大基本数据类型
      { term: '基本数据类型', def: 'Java 内置的 8 种最基础类型：byte、short、int、long、float、double、char、boolean。它们直接存值，不是对象。' },
      { term: 'int', def: '整型，占 4 字节，范围约 ±21 亿，是最常用的整数类型。' },
      { term: 'long', def: '长整型，占 8 字节。写 long 字面量时建议加后缀 L，如 10000000000L，否则会被当成 int 而溢出报错。' },
      { term: 'double / float', def: '浮点型（小数）。double 占 8 字节精度高，是默认选择；float 占 4 字节，字面量要加 f 后缀，如 3.14f。' },
      { term: 'char 与 boolean', def: 'char 存单个字符，用单引号，如 \'A\'；boolean 只有 true 和 false 两个值，用于逻辑判断。' },
    ],
    [ // 2.2 类型转换
      { term: '自动类型转换（隐式）', def: '小范围类型赋值给大范围类型时自动完成，如 int → long → double，不会丢失精度。' },
      { term: '强制类型转换（显式）', def: '大范围转小范围必须手动写 (类型)，如 (int) 3.9 得到 3。可能丢失精度或溢出，责任由程序员承担。' },
      { term: '精度丢失', def: '转换过程中小数部分被截断或数值失真的现象。(int) 3.99 是 3 而不是 4——强转只截断，不四舍五入。' },
      { term: '溢出（Overflow）', def: '数值超过类型能表示的范围。int 最大约 21 亿，再加 1 会"绕回"变成负数，且不会报错，非常隐蔽。' },
    ],
    [ // 2.3 运算符与优先级
      { term: '算术运算符', def: '+ - * / %。注意整数除法会舍去小数（7 / 2 = 3），% 是取余数（7 % 2 = 1）。' },
      { term: '自增自减', def: '++ 和 --。前置 ++i 先加再用，后置 i++ 先用再加，混在表达式里是经典考点。' },
      { term: '逻辑运算符', def: '&&（与）、||（或）、!（非）。&& 和 || 有"短路"特性：左边能确定结果时右边不再计算。' },
      { term: '位运算符', def: '& | ^ ~ << >>，直接操作二进制位。面试和算法题常见，日常开发用得少。' },
      { term: '优先级', def: '运算符的执行顺序，如先乘除后加减。记不住就加括号——括号永远是对的。' },
    ],
    [ // 2.4 常量、作用域与命名
      { term: '常量（final）', def: '用 final 修饰的变量，赋值后不能再改。习惯全大写命名，如 final double PI = 3.14159。' },
      { term: '字面量（Literal）', def: '直接写在代码里的值，如 100、3.14、\'A\'、"hello"、true，区别于变量。' },
      { term: '作用域（Scope）', def: '变量能被使用的范围，由它所在的 {} 决定。出了大括号，变量就"消失"了。' },
      { term: '标识符', def: '程序员起的名字（变量名、类名、方法名）。规则：字母/数字/_/$ 组成，不能以数字开头，不能是关键字。' },
      { term: '驼峰命名法', def: '命名约定：变量和方法用小驼峰 studentName，类名用大驼峰 StudentName，常量全大写 MAX_SIZE。' },
    ],
  ],
  'java-ch3': [
    [ // 3.1 if 与 switch
      { term: '条件表达式', def: '结果是 boolean 的表达式，如 score >= 60。if 的括号里只能放条件表达式，Java 不允许 if(1) 这种写法。' },
      { term: '分支结构', def: '根据条件选择执行路径的结构。if-else 处理范围判断，switch 处理等值匹配。' },
      { term: 'switch 穿透', def: 'case 匹配成功后如果不写 break，会继续执行后面所有 case 的代码，这是 switch 最著名的坑。' },
      { term: '三元运算符', def: '条件 ? 值1 : 值2，是 if-else 的简写，如 int max = a > b ? a : b。' },
    ],
    [ // 3.2 循环结构
      { term: '循环三要素', def: '初始化（起点）、条件（终点）、迭代（步进）。三要素写错任何一个都可能导致死循环。' },
      { term: 'for 循环', def: '次数确定的循环首选，三要素集中在 for(初始化; 条件; 迭代) 一行里，一目了然。' },
      { term: 'while / do-while', def: 'while 先判断再执行，可能一次都不执行；do-while 先执行再判断，至少执行一次。' },
      { term: 'break 与 continue', def: 'break 直接结束整个循环；continue 跳过本次，进入下一轮。嵌套循环中它们只作用于最内层。' },
      { term: '死循环', def: '条件永远为真、永不结束的循环，如 while(true)。有时是故意写的（配合 break），多数是 bug。' },
    ],
    [ // 3.3 经典循环算法
      { term: '累加器模式', def: '定义 sum = 0，循环里 sum += x。统计求和、计数都靠这个模式。' },
      { term: '标志位（Flag）', def: '用一个 boolean 记录状态，如 boolean isPrime = true，一旦发现反例就改为 false，循环后检查它。' },
      { term: '辗转相除法', def: '求最大公约数的经典算法：用 a % b 的余数反复替换，直到余数为 0。' },
      { term: '枚举法', def: '把所有可能逐个试一遍（暴力求解），如百钱买百鸡。范围不大时最实用。' },
    ],
    [ // 3.4 嵌套循环与图形打印
      { term: '嵌套循环', def: '循环里再写循环。外层走一轮，内层走一整圈，总次数是两层次数相乘。' },
      { term: '行列模型', def: '打印图形的关键思维：外层循环控制"行"，内层循环控制每行的"列"（空格和符号个数）。' },
      { term: '时间复杂度 O(n²)', def: '嵌套循环的工作量随规模平方增长。数据量上万后，双重循环会明显变慢。' },
    ],
  ],
  'java-ch4': [
    [ // 4.1 数组基础
      { term: '数组（Array）', def: '一组相同类型数据的连续存储空间，长度一旦确定就不能改变。' },
      { term: '下标（索引）', def: '元素在数组中的位置编号，从 0 开始。长度为 n 的数组，合法下标是 0 ~ n-1。' },
      { term: '数组越界', def: '访问了不存在的下标，如长度为 5 却访问 a[5]。Java 会抛出 ArrayIndexOutOfBoundsException。' },
      { term: 'length 属性', def: '数组自带的长度字段，写法 a.length（没有括号），遍历数组必备。' },
      { term: '默认值', def: 'new int[5] 后元素自动初始化为 0；double 是 0.0，boolean 是 false，引用类型是 null。' },
    ],
    [ // 4.2 二维数组与常见算法
      { term: '二维数组', def: '数组的数组，可以理解成表格：a[i] 是第 i 行，a[i][j] 是第 i 行第 j 列。' },
      { term: '冒泡排序', def: '相邻元素两两比较，大的往后"冒"，每轮把最大值推到最后。是入门必学的排序算法。' },
      { term: '选择排序', def: '每轮从未排序区找出最小值，放到已排序区末尾。比冒泡交换次数少。' },
      { term: '二分查找', def: '在有序数组中每次取中间值比较，一次排除一半，效率 O(log n)，前提是数组必须有序。' },
    ],
    [ // 4.3 String 不可变性与常量池
      { term: '不可变（Immutable）', def: 'String 对象创建后内容不能改。所有"修改"字符串的方法（如 concat、replace）其实都是返回新对象。' },
      { term: '字符串常量池', def: 'JVM 中专门缓存字符串字面量的区域。相同内容的字面量会复用同一个对象，所以 "a" == "a" 为 true，但 new String("a") == "a" 为 false。' },
      { term: 'equals 与 ==', def: '== 比较的是"是不是同一个对象"（地址），equals 比较的是内容。比较字符串内容必须用 equals。' },
      { term: 'intern()', def: '把字符串手动放入常量池并返回池中引用，可以让两个内容相同的字符串 == 成立。' },
    ],
    [ // 4.4 Arrays 工具类与字符串转换
      { term: '工具类', def: '只提供静态方法的类，不需要 new 就能用，如 Arrays.sort(a)、Math.sqrt(x)。' },
      { term: 'Arrays.toString', def: '把数组转成 "[1, 2, 3]" 形式的字符串。直接打印数组名只会看到地址（如 [I@1b6d3586）。' },
      { term: '浅拷贝', def: '只复制引用、不复制内容的拷贝。int[] b = a 之后 b 和 a 指向同一个数组，改 b 等于改 a；真正的拷贝要用 Arrays.copyOf。' },
      { term: '增强 for（for-each）', def: 'for (int x : arr) 的写法，逐个取出元素，简洁但拿不到下标，也不能修改数组。' },
    ],
  ],
  'java-ch5': [
    [ // 5.1 类与对象
      { term: '类（Class）', def: '对象的"图纸"或模板，定义了一类事物有什么属性（字段）和能做什么（方法）。' },
      { term: '对象（Object）', def: '按照类这个图纸造出来的具体个体，用 new 创建。Student 是类，new Student() 出来的"张三"是对象。' },
      { term: '字段 / 成员变量', def: '类中定义的变量，描述对象的状态，如 Student 的 name、age。每个对象各有一份。' },
      { term: '方法（Method）', def: '类中定义的函数，描述对象的行为，如 study()。对象通过 对象.方法名() 调用。' },
      { term: '引用（Reference）', def: '指向对象的"遥控器"。Student s = new Student() 中，s 是引用，真正的对象在堆内存里。' },
    ],
    [ // 5.2 构造方法与 this
      { term: '构造方法（Constructor）', def: '创建对象时自动调用的特殊方法，方法名与类名相同、没有返回类型，用于初始化字段。' },
      { term: '默认构造方法', def: '不写任何构造方法时编译器自动添加的无参构造。一旦自己写了构造方法，默认的就不再提供。' },
      { term: 'this', def: '指代"当前对象"。构造方法里 this.name = name 表示"把参数赋给本对象的字段"，解决同名冲突。' },
      { term: '方法重载（Overload）', def: '同一个类中方法名相同、参数列表不同的多个方法，如多个构造方法。调用时按参数自动匹配。' },
    ],
    [ // 5.3 static 与封装
      { term: 'static（静态）', def: '属于类而不属于对象。static 字段全类共享一份，static 方法直接用 类名.方法名() 调用，里面不能用 this。' },
      { term: '封装（Encapsulation）', def: '把字段设为 private 藏起来，只通过 public 的 getter/setter 访问，可以在 setter 里做合法性检查。' },
      { term: 'getter / setter', def: '读取和修改私有字段的标准方法，命名 getName() / setName()，是封装的落地手段。' },
      { term: '访问修饰符', def: '控制可见性的关键字：public（任意）、private（仅本类）、protected（本类+子类）、默认（同包）。' },
    ],
    [ // 5.4 包与垃圾回收
      { term: '包（Package）', def: '管理类的"文件夹"，避免类名冲突。文件首行写 package com.example;，用 import 引入别人的类。' },
      { term: 'import', def: '导入其他包的类，如 import java.util.Arrays。java.lang 包（String、Math）自动导入不用写。' },
      { term: '垃圾回收（GC）', def: 'JVM 自动回收不再被引用的对象所占的内存。Java 程序员不需要手动释放内存，这是和 C/C++ 的重要区别。' },
      { term: '堆与栈', def: '对象存在堆（Heap）里，局部变量和方法调用存在栈（Stack）里。引用在栈上，对象在堆上。' },
    ],
  ],
  'java-ch6': [
    [ // 6.1 继承
      { term: '继承（Inheritance）', def: '子类自动获得父类的字段和方法，用 extends 关键字。Java 只支持单继承：一个类只能有一个直接父类。' },
      { term: '父类 / 子类', def: '被继承的叫父类（超类），继承者叫子类。子类是父类的"特例"，如 Student extends Person。' },
      { term: 'super', def: '指代父类部分。super() 调用父类构造方法，super.study() 调用父类被重写的方法。' },
      { term: '方法重写（Override）', def: '子类重新定义父类中已有的方法（同名同参数）。重写是"覆盖"，重载是"同名不同参"，别混淆。' },
    ],
    [ // 6.2 多态
      { term: '多态（Polymorphism）', def: '同一个方法调用，根据对象的实际类型表现出不同行为。写法：父类类型 变量 = new 子类()。' },
      { term: '向上转型', def: '把子类对象当成父类类型使用，如 Animal a = new Dog()，自动完成、安全。' },
      { term: '向下转型', def: '把父类引用转回子类类型，必须强转且有风险，转型前常用 instanceof 判断。' },
      { term: '动态绑定', def: '程序运行时才决定调用哪个方法（而不是编译时）。多态能成立，靠的就是动态绑定。' },
    ],
    [ // 6.3 抽象类与接口
      { term: '抽象类（abstract class）', def: '用 abstract 修饰、不能直接 new 的类，可包含只有声明没有实现的抽象方法，强迫子类去实现。' },
      { term: '接口（Interface）', def: '一种"纯规范"：只规定能做什么（方法签名），不规定怎么做。用 implements 实现，一个类可实现多个接口。' },
      { term: ' implements 与 extends', def: '类继承类用 extends，类实现接口用 implements。继承是"是什么"（is-a），接口是"能做什么"（can-do）。' },
      { term: '默认方法（default）', def: 'Java 8 起接口中可以带实现的方法，用 default 修饰，让接口升级时不破坏老代码。' },
    ],
    [ // 6.4 final、内部类与匿名内部类
      { term: 'final 的三副面孔', def: '修饰类：不能被继承；修饰方法：不能被重写；修饰变量：变成常量不能改。' },
      { term: '内部类', def: '定义在另一个类里面的类，可以直接访问外部类的私有成员，常用于辅助逻辑。' },
      { term: '匿名内部类', def: '没有名字的"一次性"内部类，常用于快速实现接口，如 new Runnable() { ... }。Lambda 出现后用得少了。' },
    ],
  ],
  'java-ch7': [
    [ // 7.1 异常体系
      { term: '异常（Exception）', def: '程序运行中发生的意外状况，如除以零、数组越界。Java 用对象来表示异常，并有一套处理机制。' },
      { term: 'Throwable', def: '所有错误和异常的祖宗类，下面分 Error 和 Exception 两大分支。' },
      { term: 'Error 与 Exception', def: 'Error 是 JVM 级别的严重问题（如内存溢出），程序基本无能为力；Exception 是可以通过代码处理的常规异常。' },
      { term: '受检 / 非受检异常', def: '受检异常（如 IOException）编译器强制要求处理；非受检异常（RuntimeException 家族）编译不检查，运行时才暴露。' },
    ],
    [ // 7.2 try-catch-finally
      { term: 'try-catch', def: 'try 里放可能出错的代码，catch 里写出错后的补救措施。捕获后程序不会崩溃，继续往下走。' },
      { term: 'finally', def: '无论是否发生异常都会执行的代码块，通常用来释放资源（关文件、关连接）。' },
      { term: 'throw 与 throws', def: 'throw 是"抛出一个异常对象"（动作）；throws 是"声明本方法可能抛出异常"（告示），把处理责任交给调用者。' },
      { term: '异常链与吞异常', def: 'catch 后什么都不写叫"吞异常"，会让 bug 无从排查，是烂代码的标志；至少应该打印日志。' },
    ],
    [ // 7.3 自定义异常与资源管理
      { term: '自定义异常', def: '继承 Exception 或 RuntimeException 创建自己的异常类，让业务错误（如"余额不足"）也有专属异常。' },
      { term: 'try-with-resources', def: 'try (资源声明) { ... } 语法，资源用完自动关闭，不用手写 finally 关流，Java 7 引入。' },
      { term: 'AutoCloseable', def: '能被 try-with-resources 自动关闭的接口，实现了 close() 方法的资源类都实现它。' },
    ],
  ],
  'java-ch8': [
    [ // 8.1 List 与 Set
      { term: '集合框架', def: 'Java 提供的一套装数据的"容器"标准库（java.util 包），比数组灵活：长度可变、功能丰富。' },
      { term: 'ArrayList', def: '最常用的 List 实现，底层是数组，查询快、中间增删慢。长度自动扩容。' },
      { term: 'LinkedList', def: '链表实现的 List，中间增删快、随机查询慢。还能当队列/栈用。' },
      { term: 'HashSet', def: '不重复、无序的集合，靠 hashCode 和 equals 判断重复。add 重复元素会静默失败。' },
      { term: '泛型（Generic）', def: 'List<String> 中尖括号里的类型参数，让集合"只装某种类型"，编译期就能发现类型错误。' },
    ],
    [ // 8.2 Map 与遍历
      { term: 'Map（映射）', def: '存"键值对"的集合，如 HashMap<String, Integer> 可以表示"姓名 → 成绩"。键唯一，值可重复。' },
      { term: '键（Key）与值（Value）', def: 'Map 中成对的数据：通过键查值。put(k, v) 存入，get(k) 取出，containsKey(k) 判断是否存在。' },
      { term: '迭代器（Iterator）', def: '遍历集合的"游标"，hasNext() 判断还有没有，next() 取下一个，遍历时删除元素要用它的 remove()。' },
      { term: 'entrySet', def: '遍历 Map 的高效方式：map.entrySet() 返回键值对集合，同时拿到 key 和 value，比先取 key 再 get 快。' },
    ],
    [ // 8.3 集合工具类与选型指南
      { term: 'Collections 工具类', def: '集合的"瑞士军刀"：sort 排序、reverse 反转、shuffle 打乱、max/min 求极值，都是静态方法。' },
      { term: '哈希（Hash）', def: '把任意数据映射成一个固定数值的技术。HashMap/HashSet 靠它实现接近 O(1) 的查找速度。' },
      { term: 'hashCode 与 equals 约定', def: '自定义对象放进 HashSet/HashMap 前必须正确重写这两个方法：equals 为 true 的对象，hashCode 必须相同。' },
      { term: '选型口诀', def: '要顺序用 List，要去重用 Set，要键值对用 Map；查多用 ArrayList，增删多用 LinkedList，要快用 Hash 系。' },
    ],
  ],
  // ======================= Python =======================
  'py-ch1': [
    [ // 1.1 Python 的特点与运行机制
      { term: '解释型语言', def: '代码不编译成机器码，而是由解释器逐行翻译执行。Python 是解释型语言，所以写完就能跑，改起来也快。' },
      { term: '解释器（Interpreter）', def: '运行 Python 代码的程序，最常用的是 CPython（官网下载的那个）。它读一行、翻译一行、执行一行。' },
      { term: '动态类型', def: '变量不需要声明类型，类型在赋值时自动确定，同一个变量还能换类型：x = 1 之后还能 x = "hi"。' },
      { term: '胶水语言', def: 'Python 的外号：擅长把不同语言写的模块"粘"在一起，生态庞大，从爬虫到人工智能都有现成库。' },
    ],
    [ // 1.2 交互模式与脚本模式
      { term: '交互模式（REPL）', def: '在命令行输入 python 进入的 >>> 环境：敲一行立刻执行一行，适合试语法、当计算器。' },
      { term: '脚本模式', def: '把代码写进 .py 文件，用 python hello.py 整体运行。正式程序都用这种模式。' },
      { term: 'IDE', def: '集成开发环境，写代码的"豪华工作台"，集编辑、运行、调试于一体，如 PyCharm、VS Code。' },
      { term: '__pycache__', def: 'Python 自动生成的缓存目录，存放编译好的字节码（.pyc），用来加速下次启动，可以放心删除。' },
    ],
    [ // 1.3 关键字与标识符
      { term: '关键字', def: 'Python 保留的单词，如 if、for、def、class，有固定含义，不能拿来当变量名。共 30 多个，可用 keyword.kwlist 查看。' },
      { term: '标识符', def: '自己起的名字（变量名、函数名）。规则：字母/数字/下划线，不能以数字开头，区分大小写。' },
      { term: '缩进（Indent）', def: 'Python 用缩进表示代码块归属，代替其他语言的 {}。同级代码必须对齐，混用 Tab 和空格会报错。' },
      { term: 'PEP 8', def: 'Python 官方代码风格指南：4 个空格缩进、变量用蛇形命名 my_name、行宽不超过 79 字符等。' },
    ],
  ],
  'py-ch2': [
    [ // 2.1 变量与动态类型
      { term: '变量', def: '给数据起的名字，更准确地说是"贴标签"：x = 10 是让名字 x 指向值 10，而不是把 10 装进盒子 x。' },
      { term: '赋值（=）', def: '单个 = 是赋值（把右边的值贴给左边的名字），两个 == 才是比较"是否相等"，初学者最常混。' },
      { term: 'type()', def: '查看值的类型的内置函数，如 type(3.14) 返回 <class \'float\'>。' },
      { term: 'id() 与对象', def: 'Python 一切皆对象，id() 返回对象在内存中的唯一编号。is 比较编号（是不是同一个），== 比较内容。' },
    ],
    [ // 2.2 数字与运算符
      { term: 'int 与 float', def: '整数和小数。Python 的 int 没有上限，再大也不会溢出；float 有精度误差，0.1 + 0.2 != 0.3。' },
      { term: '地板除 //', def: '整除运算符，结果向下取整：7 // 2 = 3，-7 // 2 = -4（注意负数是往小了取）。' },
      { term: '取余 %', def: '求余数：7 % 3 = 1。判断奇偶（n % 2）、是否整除全靠它。' },
      { term: '幂运算 **', def: '2 ** 10 表示 2 的 10 次方 = 1024，比 math.pow 更常用。' },
      { term: '复数 complex', def: 'Python 内置支持复数，写法 3 + 4j（用 j 表示虚部），科研计算很方便。' },
    ],
    [ // 2.3 字符串详解
      { term: '字符串（str）', def: '一串字符，用单引号、双引号或三引号包起来。三引号 \'\'\'...\'\'\' 可以跨多行。' },
      { term: '索引与切片', def: 's[0] 取第一个字符；s[1:4] 切片取子串（含头不含尾）；s[::-1] 是反转字符串的经典写法。' },
      { term: 'f-string', def: '格式化字符串：f"我叫{name}，{age}岁"，大括号里直接放变量或表达式，Python 3.6+ 推荐用法。' },
      { term: '不可变', def: '字符串创建后不能改某个字符，s[0] = "X" 会报错。所有"修改"方法都返回新字符串。' },
      { term: '转义字符', def: '用反斜杠表示特殊字符：\\n 换行、\\t 制表符、\\\\ 反斜杠本身。' },
    ],
    [ // 2.4 类型转换与输入处理
      { term: '类型转换函数', def: 'int("123") 字符串转整数，float("3.14") 转小数，str(42) 转成字符串，list("abc") 转成列表。' },
      { term: 'input()', def: '从键盘读入一行，返回值永远是字符串！要做算术必须先 int() 或 float() 转换。' },
      { term: 'ValueError', def: '转换失败时抛出的异常，如 int("abc")。健壮程序会用 try 捕获它。' },
      { term: 'eval() 的警告', def: 'eval 能把字符串当代码执行，功能强但能执行任意命令，绝对不要用于用户输入，是著名安全漏洞来源。' },
    ],
  ],
  'py-ch3': [
    [ // 3.1 条件分支
      { term: 'if / elif / else', def: '条件分支三兄弟。elif 是"否则如果"的缩写，可以连写多个；else 兜底。' },
      { term: '条件表达式', def: '结果是 True/False 的表达式。Python 里空字符串、0、空列表、None 都视为 False，这叫"真值测试"。' },
      { term: '比较运算符', def: '== != > < >= <=。Python 支持链式比较：0 <= score <= 100，别的语言很少能这么写。' },
      { term: '三元表达式', def: '值1 if 条件 else 值2，如 "及格" if score >= 60 else "不及格"，是一行版 if-else。' },
    ],
    [ // 3.2 循环与 range
      { term: 'for...in', def: 'Python 的 for 是"遍历"循环：for x in 序列，逐个取出元素。序列可以是 range、列表、字符串等。' },
      { term: 'range()', def: '生成整数序列：range(5) 是 0~4，range(1, 10, 2) 是 1,3,5,7,9。含头不含尾是铁律。' },
      { term: 'while 循环', def: '条件为真就继续循环。别忘了在循环体内改变条件变量，否则死循环。' },
      { term: 'break / continue / else', def: 'break 跳出循环，continue 跳过本轮。Python 特有：循环正常结束（没被 break）会执行循环的 else 块。' },
    ],
    [ // 3.3 循环经典算法
      { term: '累加与计数', def: 'total += x、count += 1，循环里最基础的两个套路，统计分析全靠它们。' },
      { term: '标志变量', def: '用 found = False 记录状态，找到后改 True 并 break，循环后根据它判断结果。' },
      { term: 'enumerate()', def: '遍历时同时拿到下标和值：for i, ch in enumerate("abc")。' },
      { term: 'zip()', def: '把多个序列"拉链式"配对遍历：for name, score in zip(names, scores)。' },
    ],
  ],
  'py-ch4': [
    [ // 4.1 列表 list
      { term: '列表（list）', def: '有序、可变、允许重复的容器，用 [] 创建。可以装不同类型的元素，是 Python 最常用的数据结构。' },
      { term: 'append / insert / remove', def: '尾部追加、指定位置插入、按值删除。注意 remove 删的是值，pop 删的是下标。' },
      { term: '列表推导式', def: '[x * x for x in range(10)] 一行生成列表，简洁高效，是 Python 的招牌语法。' },
      { term: 'sort 与 sorted', def: 'lst.sort() 原地排序（改原列表，返回 None）；sorted(lst) 返回新列表。用 reverse=True 降序。' },
    ],
    [ // 4.2 元组与集合
      { term: '元组（tuple）', def: '有序但不可变的列表，用 () 创建。常用于函数返回多个值：return x, y 其实就是返回元组。' },
      { term: '打包与解包', def: 'a, b = b, a 一行交换两个变量，靠的就是元组的自动打包解包。' },
      { term: '集合（set）', def: '无序、不重复的容器，用 {} 或 set() 创建。支持并集 |、交集 &、差集 - 等数学运算，去重神器。' },
      { term: '可哈希（Hashable）', def: '能放进集合或当字典键的类型。数字、字符串、元组可哈希；列表、字典不可哈希（会报错）。' },
    ],
    [ // 4.3 字典 dict
      { term: '字典（dict）', def: '键值对容器：{"张三": 90, "李四": 85}。通过键取值 d["张三"]，键必须唯一且可哈希。' },
      { term: '键（Key）', def: '字典的"索引"。d.get(key, 默认值) 是安全的取值方式，键不存在时返回默认值而不是报错。' },
      { term: 'items() 遍历', def: 'for k, v in d.items() 同时遍历键和值；keys() 只遍历键，values() 只遍历值。' },
      { term: '字典推导式', def: '{k: v for k, v in ...} 一行建字典，和列表推导式同理。' },
    ],
    [ // 4.4 四大数据结构对比速查
      { term: '可变 vs 不可变', def: '列表、集合、字典可变（能改内容）；数字、字符串、元组不可变。这直接影响传参和拷贝的行为。' },
      { term: '有序 vs 无序', def: 'Python 3.7 起字典也保持插入顺序；集合始终无序，不能按下标访问。' },
      { term: 'in 运算符', def: '成员判断：x in 容器。对列表是逐个找（慢），对集合和字典是哈希查找（快）。' },
      { term: '选型口诀', def: '要顺序用列表，只读用元组，去重和交并用集合，要键值查找用字典。' },
    ],
  ],
  'py-ch5': [
    [ // 5.1 参数体系
      { term: '形参与实参', def: '定义函数时写的参数叫形参（placeholder），调用时传入的值叫实参（实际数据）。' },
      { term: '默认参数', def: 'def f(x, n=2) 中 n 有默认值，调用时可省略。注意默认值别用列表等可变对象（经典陷阱）。' },
      { term: '关键字参数', def: '调用时指名道姓传参：f(n=3, x=10)，顺序无所谓，可读性好。' },
      { term: '*args 与 **kwargs', def: '接收任意多个位置参数（打包成元组）和关键字参数（打包成字典），写通用函数时使用。' },
    ],
    [ // 5.2 返回值与作用域
      { term: 'return', def: '结束函数并交回结果。不写 return 的函数默认返回 None。return 后面的代码不会执行。' },
      { term: 'None', def: 'Python 的"空值"，表示什么都没有，类似其他语言的 null。' },
      { term: '局部变量与全局变量', def: '函数内定义的变量只在函数内有效（局部）；函数外的是全局。函数内改全局变量需要 global 声明。' },
      { term: 'LEGB 规则', def: 'Python 找变量的顺序：Local 局部 → Enclosing 嵌套外层 → Global 全局 → Built-in 内置，就近原则。' },
    ],
    [ // 5.3 Lambda 与高阶函数
      { term: 'lambda（匿名函数）', def: 'lambda x: x * 2 一行定义小函数，没有函数名，常用于临时传给其他函数。' },
      { term: '高阶函数', def: '参数或返回值是函数的函数，如 sorted(lst, key=lambda s: s[1]) 里的 key。' },
      { term: 'map / filter', def: 'map(f, lst) 把每个元素过一遍 f；filter(f, lst) 留下 f 结果为真的元素。' },
      { term: '闭包（Closure）', def: '内层函数记住了外层函数的变量，即使外层已执行完。是装饰器的底层原理。' },
    ],
    [ // 5.4 递归入门
      { term: '递归（Recursion）', def: '函数自己调用自己。必须有终止条件（基例），否则无限递归直到栈溢出。' },
      { term: '基例与递推', def: '递归的两部分：基例是直接给出答案的最简单情形（如 0! = 1），递推是把大问题拆成小问题（n! = n × (n-1)!）。' },
      { term: '递归深度限制', def: 'Python 默认最多递归约 1000 层，超过报 RecursionError，可用 sys.setrecursionlimit 调整。' },
      { term: '栈帧', def: '每次函数调用在内存栈上开的一块空间。递归层数 = 栈帧层数，这就是深度限制的来源。' },
    ],
  ],
  'py-ch6': [
    [ // 6.1 类与对象
      { term: '类（class）', def: '用 class 关键字定义的"图纸"，描述一类对象的属性和行为。类名习惯大驼峰：class Student。' },
      { term: 'self', def: '指向"当前对象"的第一个参数，定义方法时必须写、调用时不用传。相当于 Java 的 this。' },
      { term: '__init__', def: '构造方法，创建对象时自动调用，用于初始化属性：self.name = name。' },
      { term: '实例属性与类属性', def: 'self.xxx 是每个对象各自的；写在类里、方法外的是全类共享的类属性。' },
    ],
    [ // 6.2 魔术方法速览
      { term: '魔术方法', def: '双下划线包裹的特殊方法，如 __init__、__str__，在特定时机被 Python 自动调用。' },
      { term: '__str__', def: '定义 print(对象) 时显示的内容，返回一个字符串，让对象"自我介绍"。' },
      { term: '__len__ / __eq__', def: '定义 len(对象) 和 对象1 == 对象2 的行为。运算符和内置函数背后都是魔术方法。' },
      { term: '运算符重载', def: '通过实现 __add__ 等魔术方法，让自己的对象支持 + 等运算符。' },
    ],
    [ // 6.3 异常处理
      { term: 'try / except', def: 'try 里放可能出错的代码，except 指定捕获哪种异常以及怎么处理，程序就不会崩溃退出。' },
      { term: '异常类', def: 'ValueError、TypeError、ZeroDivisionError、KeyError、IndexError 等都是内置异常类，except 后可指定具体类型。' },
      { term: 'else 与 finally', def: 'try 没出错走 else；无论出不出错都走 finally，常用于收尾（关文件等）。' },
      { term: 'raise 与 with', def: 'raise 主动抛出异常；with open(...) as f 是上下文管理器，自动关文件，不用手写 finally。' },
    ],
  ],
  // ======================= C++ =======================
  'cpp-ch1': [
    [ // 1.1 从 C 到 C++
      { term: '编译型语言', def: '源代码先被编译器整体翻译成机器码（.exe），运行时不再需要编译。C++ 是编译型语言，所以速度快。' },
      { term: '兼容 C', def: 'C++ 几乎包含 C 的全部语法，C 程序基本可以原样用 C++ 编译器编译，学 C++ 等于顺带学 C。' },
      { term: '面向对象', def: 'C++ 在 C 的基础上加入了类、继承、多态等面向对象特性，因此既能写底层又能驾驭大型工程。' },
      { term: '头文件 #include', def: '把库声明"复制"进当前文件，如 #include <iostream> 引入输入输出库，是使用标准库功能的前提。' },
    ],
    [ // 1.2 cin 与 cout
      { term: 'cout', def: '标准输出流对象，配合 << 把数据"流向"屏幕：cout << x << endl。多个内容可以连续 <<。' },
      { term: 'cin', def: '标准输入流对象，配合 >> 从键盘读数据：cin >> x。遇空格自动分词，类型自动匹配。' },
      { term: 'endl', def: '换行并刷新输出缓冲区。比 "\\n" 多做一步刷新，频繁使用略慢，调试时更安全。' },
      { term: '流（Stream）', def: '数据按顺序流动的抽象。cout 是输出流，cin 是输入流，<< 和 >> 的方向就是数据的流向，很好记。' },
    ],
    [ // 1.3 命名空间与引用初步
      { term: '命名空间（namespace）', def: '给名字划分"势力范围"防止重名冲突。std 是标准库的命名空间，cout 的全名是 std::cout。' },
      { term: 'using namespace std', def: '省去每次都写 std:: 前缀的声明。方便但有污染风险，大工程里建议写 std::cout 而不是图省事。' },
      { term: '引用（&）', def: '变量的"别名"：int &r = a 之后，r 和 a 是同一个变量的两个名字，改 r 就是改 a。' },
      { term: ':: 作用域运算符', def: '表示"属于哪个范围"，std::cout 意为"std 命名空间里的 cout"，类名::静态成员 也是它。' },
    ],
  ],
  'cpp-ch2': [
    [ // 2.1 内置数据类型
      { term: 'int / long long', def: 'int 通常 4 字节（约 ±21 亿）；long long 8 字节，竞赛中怕溢出就用它。' },
      { term: 'double', def: '双精度浮点数，8 字节，约 15 位有效数字。浮点比较别用 ==，要判断差值是否小于一个极小值。' },
      { term: 'bool 与 char', def: 'bool 只有 true/false；char 存单个字符，本质是 1 字节整数，\'A\' 就是 65，可以直接参与算术。' },
      { term: 'sizeof', def: '编译期运算符，返回类型或变量占的字节数：sizeof(int) 通常为 4。' },
      { term: 'auto', def: '让编译器根据初始化值自动推断类型：auto x = 3.14 中 x 是 double。C++11 引入，写迭代器时特别省事。' },
    ],
    [ // 2.2 类型转换与运算规则
      { term: '隐式转换', def: '混合运算时小类型自动升级：int + double 的结果是 double；int / int 仍是 int（5 / 2 = 2）。' },
      { term: '强制转换', def: '(double)a / b 或 static_cast<double>(a)，把整数除法变成小数除法。' },
      { term: 'static_cast', def: 'C++ 风格的类型转换，比 C 风格的 (类型) 更安全、更易搜索，推荐在 C++ 中使用。' },
      { term: '溢出与回绕', def: 'int 超出范围不会报错而是"绕回"负数。竞赛中求大结果要早早换 long long 或取模。' },
    ],
    [ // 2.3 常量与 constexpr
      { term: 'const', def: '只读变量：const int N = 100 之后不能再改，改了就编译报错。比 #define 更安全（有类型检查）。' },
      { term: 'constexpr', def: '编译期常量：要求值在编译时就能算出来，比 const 更严格，可用于数组长度等场合。' },
      { term: '#define 宏', def: '预处理期纯文本替换：#define MAX 100。没有类型、不做检查，容易出怪错，现代 C++ 建议用 const 替代。' },
    ],
  ],
  'cpp-ch3': [
    [ // 3.1 分支与循环
      { term: 'if / switch', def: '分支结构。switch 按整型或枚举等值跳转，case 末尾记得 break，否则"穿透"执行下一个 case。' },
      { term: 'for / while', def: '次数确定用 for，条件驱动用 while。C++ 的 for 还支持范围循环 for (int x : arr)。' },
      { term: '范围 for', def: 'for (auto &x : v) 直接遍历容器元素，加 & 才能修改原元素，不加 & 改的只是副本。' },
      { term: '死循环', def: 'while(true) 或 for(;;)。服务器程序常用它配 break，学习阶段多数是条件写错的 bug。' },
    ],
    [ // 3.2 函数进阶特性
      { term: '函数重载', def: '同名但参数列表不同的多个函数可以共存，编译器按实参自动选择，如 add(int,int) 和 add(double,double)。' },
      { term: '默认参数', def: '定义时给参数默认值：void f(int x, int n = 10)，调用时可省略 n。默认参数必须从右往左连续。' },
      { term: 'inline 内联', def: '建议编译器把函数体直接展开在调用处，省去调用开销，适合短小高频的函数。' },
      { term: '函数声明与定义', def: '声明（原型）告诉编译器"有这么个函数"，定义给出具体实现。分文件编写时声明放头文件。' },
    ],
    [ // 3.3 引用传参与函数返回引用
      { term: '值传递', def: '默认传参方式：实参被复制一份给形参，函数里改形参不影响外面的实参。大对象这样传很慢。' },
      { term: '引用传递', def: 'void f(int &x) 形参是实参的别名，函数里改 x 就直接改了实参，还能避免拷贝。' },
      { term: 'const 引用', def: 'const string &s：既不拷贝又保证不改，是传递大对象的黄金写法。' },
      { term: '返回引用的警告', def: '千万别返回局部变量的引用——函数结束局部变量就销毁了，引用会指向一块已释放的内存（悬垂引用）。' },
    ],
  ],
  'cpp-ch4': [
    [ // 4.1 指针深入
      { term: '指针（Pointer）', def: '存内存地址的变量：int *p = &a 让 p 指向 a，*p 取出所指内容。指针是 C/C++ 的灵魂与重灾区。' },
      { term: '& 与 *', def: '& 取地址（&a 是 a 的地址），* 解引用（*p 是 p 指向的值）。声明里的 int *p 和表达式里的 *p 含义不同。' },
      { term: '指针与数组', def: '数组名在多数场景下会"退化"为首元素指针，arr[i] 等价于 *(arr + i)，这就是指针算术。' },
      { term: 'nullptr', def: '空指针字面量（C++11），表示"不指向任何东西"。比 NULL 和 0 更类型安全。' },
      { term: '野指针', def: '指向已释放或非法内存的指针，解引用它行为未定义（可能崩溃也可能"正常"），是最难查的 bug 之一。' },
    ],
    [ // 4.2 动态内存
      { term: 'new / delete', def: '堆上申请/释放内存：int *p = new int(10); 用完必须 delete p;，否则内存泄漏。' },
      { term: '堆（Heap）', def: '动态内存的来源区域，生存期由程序员控制；与之相对的是栈，局部变量离开作用域自动销毁。' },
      { term: '内存泄漏', def: 'new 出来的内存忘记 delete，程序越跑越占内存。长期运行的服务程序最怕它。' },
      { term: 'new[] 与 delete[]', def: '数组版动态内存：int *a = new int[n]; 配对 delete[] a;，两个括号都不能丢。' },
    ],
    [ // 4.3 string 类与 C 字符串
      { term: 'std::string', def: 'C++ 标准库的字符串类：自动管理内存，支持 + 拼接、length()、substr() 等，日常用它而不是字符数组。' },
      { term: 'C 风格字符串', def: '以 \'\\0\' 结尾的字符数组，如 char s[] = "abc" 实际占 4 个字节（含结尾的 \\0）。' },
      { term: '\\0（空字符）', def: '字符串结束标志，ASCII 码为 0。所有 C 字符串函数都靠它判断哪里是结尾。' },
      { term: 'c_str()', def: '把 std::string 转成 C 风格字符串的方法，调用只认 char* 的老接口时要用。' },
    ],
    [ // 4.4 结构体与联合体
      { term: 'struct（结构体）', def: '把多个不同类型的数据打包成一个整体，如 struct Student { string name; int age; }。C++ 的 struct 还能有成员函数。' },
      { term: '. 与 ->', def: '访问成员的两种方式：对象用点 s.name；指针用箭头 p->name（等价于 (*p).name）。' },
      { term: 'union（联合体）', def: '所有成员共用同一块内存，同一时刻只能存一个成员的值，节省空间，嵌入式常用。' },
      { term: '内存对齐', def: '编译器让成员按特定边界摆放以提高访问速度，所以 struct 的 sizeof 常比成员之和大。' },
    ],
  ],
  'cpp-ch5': [
    [ // 5.1 类的基本结构
      { term: 'class 与对象', def: 'class 定义类型（图纸），对象是它的实例。C++ 的 class 成员默认 private，struct 默认 public，这是二者唯一区别。' },
      { term: '成员函数', def: '写在类里的函数，能直接访问本对象的成员变量，通过 对象.函数() 调用。' },
      { term: '构造函数', def: '与类同名、无返回类型的特殊函数，new 对象时自动调用，用于初始化。可以重载多个。' },
      { term: '析构函数', def: '~类名() 形式，对象销毁时自动调用，用来释放资源（如 delete 成员指针）。' },
    ],
    [ // 5.2 拷贝构造与运算符重载
      { term: '拷贝构造函数', def: '形如 Student(const Student &other)，用一个已有对象初始化新对象时调用。涉及指针成员时必须自己写（深拷贝）。' },
      { term: '浅拷贝与深拷贝', def: '默认拷贝只复制指针本身（两个对象共用一块内存，double free 警告！）；深拷贝连内容一起复制。' },
      { term: '运算符重载', def: '让自己定义的类支持 +、==、<< 等运算符，如 bool operator<(const Student &o) 让 sort 能排 Student。' },
      { term: '三/五法则', def: '只要自定义了析构、拷贝构造、拷贝赋值中的任何一个，通常三个都需要自定义（涉及资源管理的类）。' },
    ],
    [ // 5.3 this 指针与静态成员
      { term: 'this 指针', def: '成员函数里指向"当前对象"的指针，return *this 可以支持链式调用 a.set(1).set(2)。' },
      { term: 'static 成员', def: '静态成员变量全类共享一份（所有对象共用），静态成员函数没有 this，用 类名::成员 访问。' },
      { term: 'const 成员函数', def: 'int getAge() const 承诺不修改对象，const 对象只能调用 const 成员函数。' },
    ],
  ],
  'cpp-ch6': [
    [ // 6.1 继承与多态
      { term: '继承（: public）', def: 'class Dog : public Animal 让 Dog 获得 Animal 的成员。public 继承保持"是一种"（is-a）关系。' },
      { term: '虚函数 virtual', def: '父类中用 virtual 修饰的函数，通过父类指针调用时会执行子类的版本——多态的开关。' },
      { term: '多态', def: 'Animal *p = new Dog; p->speak() 调用的是 Dog 的 speak。同一句话，不同对象不同反应。' },
      { term: '虚析构', def: '父类析构函数应写成 virtual ~Animal() {}，否则通过父类指针 delete 子类对象会泄漏子类部分。' },
      { term: 'override', def: '显式标注"这是重写父类虚函数"，让编译器帮忙检查签名是否写对，C++11 起强烈推荐。' },
    ],
    [ // 6.2 STL 三大件
      { term: 'STL', def: '标准模板库：容器（装数据）、迭代器（访问数据）、算法（处理数据）三大件，C++ 效率神器。' },
      { term: 'vector', def: '动态数组：push_back 追加、size() 大小、[] 随机访问，长度自动增长，替代原生数组的首选。' },
      { term: '迭代器（Iterator）', def: '容器里的"游标"，v.begin() 指向开头、v.end() 指向末尾之后，算法靠它遍历容器。' },
      { term: 'sort 算法', def: '#include <algorithm> 后 sort(v.begin(), v.end()) 排序，可传第三个参数自定义比较规则。' },
    ],
    [ // 6.3 map 与 pair 实战
      { term: 'map', def: '键值对容器，按键自动有序（红黑树实现）：map<string, int> score; score["张三"] = 90。' },
      { term: 'pair', def: '把两个值捆成一个：pair<string, int> p = {"张三", 90}，用 p.first / p.second 访问。' },
      { term: 'make_pair 与 {}', def: '创建 pair 的快捷方式，C++11 后直接用花括号 {key, value} 更简洁。' },
      { term: 'count / find', def: 'm.count(key) 判断键是否存在（0 或 1），m.find(key) 返回迭代器，比直接用 [] 查询更安全（[] 会顺手插入默认值）。' },
    ],
  ],
  // ======================= C =======================
  'c-ch1': [
    [ // 1.1 为什么学 C
      { term: '过程式语言', def: '以"步骤"为中心组织代码的语言：一个程序 = 一串函数的调用。C 是过程式的代表，和面向对象思路不同。' },
      { term: '贴近硬件', def: 'C 能直接操作内存地址，执行效率仅次于汇编，操作系统、单片机、嵌入式系统几乎都用它写。' },
      { term: '编译链接', def: 'C 程序的诞生两步走：编译（.c → .o 目标文件）+ 链接（.o + 库 → 可执行文件）。' },
      { term: '标准库', def: 'C 官方提供的函数集合，stdio.h（输入输出）、stdlib.h（内存与工具）、string.h（字符串）等，用前先 #include。' },
    ],
    [ // 1.2 程序基本结构与 printf
      { term: 'main 函数', def: 'C 程序的入口，程序从这里开始执行。int main(void) 结尾习惯 return 0 表示正常结束。' },
      { term: 'printf', def: '格式化输出函数：printf("a=%d", a)。%d 整数、%f 小数、%c 字符、%s 字符串，占位符和变量类型必须对应。' },
      { term: '格式占位符', def: '字符串里的 % 开头标记，如 %.2f 保留两位小数、%5d 宽度 5 右对齐。类型不匹配是常见崩溃源。' },
      { term: '转义字符', def: '\\n 换行、\\t 制表、\\" 双引号、%% 输出百分号本身。' },
      { term: '语句与分号', def: 'C 语言每条语句以 ; 结尾，漏分号是新手第一大报错来源。' },
    ],
    [ // 1.3 标识符与关键字
      { term: '关键字', def: 'C 保留的 32 个单词：int、if、while、return 等，全部小写，不能用作变量名。' },
      { term: '标识符', def: '变量/函数的名字：字母、数字、下划线组成，不能以数字开头，严格区分大小写（age 和 Age 是两个变量）。' },
      { term: '注释', def: '// 单行注释，/* ... */ 多行注释。注释是给"人"看的，编译器直接忽略。' },
      { term: '蛇形命名', def: 'C 社区惯例：student_name、max_value，单词间用下划线，全小写。' },
    ],
  ],
  'c-ch2': [
    [ // 2.1 基本数据类型
      { term: 'int / short / long', def: '整型家族。int 通常 4 字节；short 2 字节；long 在 64 位 Linux 是 8 字节、Windows 是 4 字节，移植时注意。' },
      { term: 'float / double', def: '浮点型。float 约 7 位有效数字，double 约 15 位。默认用 double，printf 里两者都用 %f。' },
      { term: 'char', def: '字符型，本质是 1 字节整数，\'A\' 等于 65。所以 char c = \'A\'; c + 1 是 \'B\'。' },
      { term: 'unsigned', def: '无符号修饰：unsigned int 不存负数，正数范围翻倍。和下标、sizeof 打交道时常见。' },
      { term: '_Bool 与 stdbool.h', def: 'C99 起有 _Bool，#include <stdbool.h> 后可以用 bool、true、false。' },
    ],
    [ // 2.2 运算符与类型转换
      { term: '整数除法', def: 'int 之间相除结果仍是 int：5 / 2 = 2（直接砍小数）。想得 2.5 必须先把一边变 double。' },
      { term: '取余 %', def: '只对整数有效：a % b 得余数。判奇偶、判整除、循环数组下标都靠它。' },
      { term: '自增自减', def: '++i 先加后用，i++ 先用后加。printf("%d %d", i, i++) 这种写法结果是未定义的，千万别写。' },
      { term: '隐式转换', def: '混合运算自动升级：char → int → double。赋值时大转小会静默截断，编译器可能只警告不报错。' },
    ],
    [ // 2.3 运算符优先级速查
      { term: '优先级', def: '从高到低大致：括号 > 单目(! ++ -) > 乘除余 > 加减 > 移位 > 大小比较 > 相等比较 > && > || > 赋值。' },
      { term: '结合性', def: '同优先级谁先算。大多数从左往右；赋值和单目从右往左：a = b = 5 是 a = (b = 5)。' },
      { term: '逗号运算符', def: 'int a = (1, 2, 3) 结果是 3——取最后一个。for 里的 i++, j++ 才是它的正当用途。' },
      { term: '括号保命', def: '优先级记不全就加括号，可读性还更好，工程师的成熟标志。' },
    ],
  ],
  'c-ch3': [
    [ // 3.1 分支结构
      { term: 'if 的条件', def: 'C 没有 bool 传统：0 为假，非 0 为真。if (x = 5) 把赋值当判断、永远为真——最经典的 bug，== 别写成 =。' },
      { term: 'else 配对', def: 'else 永远和最近的、未配对的 if 结合（悬挂 else 问题），嵌套时务必用 {} 明确归属。' },
      { term: 'switch', def: '多路等值分支：switch(整型表达式)，case 后必须是常量，结尾记得 break 防穿透。' },
      { term: '条件运算符', def: '?: 三元表达式：max = a > b ? a : b，一行完成简单二选一。' },
    ],
    [ // 3.2 循环结构
      { term: 'for 循环', def: 'for(初始化; 条件; 更新) 三段式。C99 起可以在第一段里声明变量 for (int i = 0; ...)。' },
      { term: 'while / do-while', def: 'while 先判后做可能零次；do-while 先做后判至少一次，末尾的分号最容易漏。' },
      { term: 'break / continue', def: 'break 跳出本层循环；continue 跳过本轮剩余部分直接进下一轮。都只影响最内层。' },
      { term: '哨兵值', def: '一个特殊的输入值表示"结束"，如输入 -1 停止循环，是输入驱动程序的惯用法。' },
    ],
    [ // 3.3 输入驱动的循环
      { term: 'scanf 返回值', def: '返回成功读到的项数。while (scanf("%d", &n) == 1) 可以一直读到输入结束（Ctrl+Z / Ctrl+D）。' },
      { term: '& 取地址', def: 'scanf("%d", &n) 里的 & 不能少——scanf 需要知道把读到的数放到哪块内存。漏 & 是崩溃高发点。' },
      { term: '缓冲区残留', def: 'scanf 读数字后换行符留在缓冲区，接着读字符会读到这个 \\n。常见对策：格式串前加空格 " %c"。' },
      { term: 'EOF', def: 'End Of File，值为 -1 的宏，表示输入结束。getchar() 读到末尾就返回 EOF。' },
    ],
  ],
  'c-ch4': [
    [ // 4.1 数组基础
      { term: '数组', def: '相同类型元素的连续存储：int a[10]。长度必须是编译期常量（C99 起支持变长数组但不推荐）。' },
      { term: '下标从 0 开始', def: 'a[0] 是第一个元素，a[9] 是最后一个。a[10] 越界但不报错——读到的是"别人家"的内存，后果难料。' },
      { term: '初始化', def: 'int a[5] = {1, 2} 剩余自动补 0；int a[] = {1, 2, 3} 长度由初始化列表推断。' },
      { term: 'sizeof 求长度', def: 'int len = sizeof(a) / sizeof(a[0]) 是求数组元素个数的经典公式（只对真数组有效，指针不行）。' },
    ],
    [ // 4.2 字符数组与字符串函数
      { term: 'C 字符串', def: '以 \'\\0\' 结尾的字符数组。char s[] = "abc" 占 4 字节，strlen(s) 是 3（不含 \\0），sizeof(s) 是 4。' },
      { term: 'strlen / strcpy / strcat / strcmp', def: 'string.h 四剑客：求长、拷贝、拼接、比较。strcmp 返回 0 表示相等，<0 / >0 表示字典序先后。' },
      { term: '缓冲区溢出', def: 'strcpy 不检查目标空间，源串太长就"写穿"数组。安全替代品是 strncpy、snprintf。' },
      { term: 'gets 已禁用', def: 'gets 无边界检查极其危险，已从 C11 标准移除，看到它一律换成 fgets。' },
    ],
    [ // 4.3 数组经典算法
      { term: '冒泡排序', def: '相邻比较交换，每轮把最大值"冒"到末尾，n² 复杂度。考试与入门的双重常客。' },
      { term: '选择排序', def: '每轮选出最小值换到前面。理解"找最值 + 交换"的组合即可。' },
      { term: '二分查找', def: '有序数组里每次砍一半：int mid = (left + right) / 2。注意 left + right 可能溢出，稳妥写法 left + (right - left) / 2。' },
      { term: '逆置', def: '双指针一头一尾往中间走，边走边换：while (i < j) swap(a[i++], a[j--])。' },
    ],
  ],
  'c-ch5': [
    [ // 5.1 函数基础
      { term: '函数三要素', def: '返回类型、函数名、参数列表。int max(int a, int b) 就是一个完整声明。' },
      { term: '函数原型', def: '函数在使用前的"预告"（声明），一般放文件头部或 .h 文件里，让编译器提前认识它。' },
      { term: '值传递', def: 'C 只有值传递：形参是实参的副本，函数里改形参影响不了实参。想改实参必须传地址（指针）。' },
      { term: 'return', def: '结束函数并交回一个值。void 函数里 return; 表示直接返回，不帯值。' },
    ],
    [ // 5.2 指针——C 语言的灵魂
      { term: '指针', def: '存地址的变量：int *p = &a。类型决定"怎么解释这块内存"：int* 读 4 字节，char* 读 1 字节。' },
      { term: '解引用 *', def: '*p 访问指针指向的内容。*p = 20 就改掉了 a 的值——这是函数修改外部变量的钥匙。' },
      { term: '指针与数组', def: 'a[i]、*(a+i)、*(p+i) 三者等价。数组名作函数参数时退化为指针，所以函数里 sizeof 数组名得不到真长度。' },
      { term: '指针算术', def: 'p + 1 不是地址加 1 字节，而是加"一个元素"的字节数（int* 加 4）。' },
      { term: 'NULL 与空指针', def: 'NULL 表示不指向任何对象。对 NULL 解引用必崩，用指针前先判空是肌肉记忆级的习惯。' },
    ],
    [ // 5.3 指针进阶与常见错误
      { term: '野指针', def: '未初始化或指向已释放内存的指针。预防：定义即置 NULL，free 后立刻置 NULL。' },
      { term: '悬垂指针', def: '指向已销毁变量的指针，典型如返回局部变量的地址——局部变量出函数就没了。' },
      { term: '数组越界写', def: 'a[10] = 0 把别的变量的内存改了，程序行为完全无法预测，是最阴间的 bug 类别。' },
      { term: 'const 与指针', def: 'const int *p：指向的内容不能改；int * const p：指针本身不能改。读法：从右往左读声明。' },
    ],
  ],
  'c-ch6': [
    [ // 6.1 结构体
      { term: 'struct', def: '把不同类型的数据捆成一个整体：struct Student { char name[20]; int age; float score; }。' },
      { term: '成员访问', def: '结构体变量用 .，结构体指针用 ->：s.age 与 p->age。' },
      { term: 'typedef', def: '给类型起别名：typedef struct Student Student; 之后就不用每次写 struct 了。' },
      { term: '结构体传参', def: '结构体作为参数是整体拷贝，太大时传指针（const struct Student *）更高效。' },
    ],
    [ // 6.2 链表基础
      { term: '链表（Linked List）', def: '用指针串起来的节点序列，每个节点存数据 + 下一节点地址。插入删除 O(1)，但随机访问只能从头走。' },
      { term: '节点（Node）', def: '链表的基本单元：struct Node { int data; struct Node *next; }——结构体里装指向自己的指针。' },
      { term: '头指针', def: '指向第一个节点的指针，是整条链表的"入口"，丢了它整条链表就找不回来了。' },
      { term: 'malloc / free', def: '堆内存申请与释放：struct Node *p = malloc(sizeof *p); 用完 free(p)。配不成对就是内存泄漏。' },
    ],
    [ // 6.3 文件操作与预处理
      { term: 'fopen / fclose', def: '打开文件返回 FILE* 指针，模式 "r" 读、"w" 写（清空）、"a" 追加。用完必须 fclose。' },
      { term: 'fprintf / fscanf', def: 'printf/scanf 的文件版，第一个参数是 FILE*。读文件到末尾 fscanf 返回 EOF。' },
      { term: '预处理指令', def: '# 开头的指令在编译前执行：#include 复制头文件、#define 定义宏、#ifdef 条件编译。' },
      { term: '头文件卫士', def: '#ifndef __XXX_H / #define / #endif 三件套，防止头文件被重复包含导致重定义错误。' },
    ],
  ],
  // ======================= HTML =======================
  'html-ch1': [
    [ // 1.1 HTML 是什么
      { term: 'HTML', def: 'HyperText Markup Language，超文本标记语言。用"标签"描述网页的结构与内容，是网页的骨架。' },
      { term: '标记语言 vs 编程语言', def: 'HTML 只负责"描述有什么"，没有变量、循环、判断，所以它是标记语言而非编程语言。逻辑交给 JavaScript。' },
      { term: '标签（Tag）', def: '尖括号包裹的关键字，如 <p>。多数成对出现：<p>内容</p>，少数自闭合：<img>、<br>。' },
      { term: '元素（Element）', def: '从开始标签到结束标签的完整整体。<p>你好</p> 这一整段就是一个元素。' },
      { term: '浏览器渲染', def: '浏览器读取 HTML 文本，解析成 DOM 树再绘制到屏幕的过程。标签写错浏览器会"猜"，但猜得未必如你所愿。' },
    ],
    [ // 1.2 文档结构详解
      { term: '<!DOCTYPE html>', def: '文档类型声明，告诉浏览器"用 HTML5 标准解析"。必须是文件第一行，不是标签。' },
      { term: '<head> 与 <body>', def: 'head 放"看不见"的元信息（标题、编码、CSS）；body 放看得见的页面内容。' },
      { term: '<meta charset="UTF-8">', def: '声明字符编码为 UTF-8，缺了它中文会变乱码，是中文网页的保命符。' },
      { term: '<title>', def: '浏览器标签页上显示的标题，也是搜索引擎结果里的标题，SEO 重要元素。' },
      { term: 'viewport', def: '<meta name="viewport" content="width=device-width"> 让网页在手机上正确缩放，移动端必备。' },
    ],
    [ // 1.3 全局属性与调试工具
      { term: '属性（Attribute）', def: '写在开始标签里的附加信息：<img src="a.jpg" alt="图">，name="value" 形式，修饰元素的行为。' },
      { term: 'id 与 class', def: 'id 是元素的唯一身份证号（一页只能一个）；class 是"分组标签"（可多个元素共用），CSS 和 JS 靠它们找到元素。' },
      { term: 'title 属性', def: '鼠标悬停时显示的提示文字，任何元素都能加。' },
      { term: '开发者工具（DevTools）', def: '浏览器按 F12 打开，Elements 看结构、Console 看报错、Network 看请求，前端调试的命根子。' },
    ],
  ],
  'html-ch2': [
    [ // 2.1 文本标签
      { term: '标题 h1~h6', def: '六级标题，h1 最大最重要。一页通常只用一个 h1，层级要连续，别跳级。' },
      { term: '<p> 与 <br>', def: 'p 是段落（块级，上下有空行）；br 是段内强制换行，是自闭合标签。' },
      { term: '<strong> / <em>', def: '语义化加粗与斜体（强调含义），比纯样式的 <b>/<i> 更推荐，屏幕阅读器能听出强调语气。' },
      { term: '块级与行内', def: '块级元素（p、h1、div）独占一行；行内元素（span、strong、a）在文字流中不占整行。' },
    ],
    [ // 2.2 超链接与图片
      { term: '<a> 超链接', def: '<a href="地址">文字</a>。href 可以是网址、页内锚点 #id、mailto: 邮箱。' },
      { term: 'target="_blank"', def: '让链接在新标签页打开。配 rel="noopener" 更安全，防止新页面控制原页面。' },
      { term: '相对路径与绝对路径', def: './img/a.jpg 相对当前文件找；/img/a.jpg 从网站根目录找；https://... 是绝对地址。路径写错图片就变裂图。' },
      { term: 'alt 属性', def: '图片加载失败时的替代文字，也是视障用户读屏的依据，更是 SEO 加分项——永远不要省略。' },
    ],
  ],
  'html-ch3': [
    [ // 3.1 三种列表
      { term: '<ul> / <ol>', def: '无序列表（圆点）与有序列表（编号）。直接子元素只能是 <li>，别往 ul 里直接塞文字。' },
      { term: '<li>', def: 'List Item，列表项。列表的每一项都必须包在 li 里。' },
      { term: '<dl> 定义列表', def: '<dl> 里 <dt> 是名词、<dd> 是解释，适合术语表、问答列表。' },
      { term: '嵌套列表', def: '把新的 <ul> 放进某个 <li> 里就得到多级目录，导航菜单的树形结构就是这么做的。' },
    ],
    [ // 3.2 表格
      { term: 'table 三件套', def: '<table> 包 <tr>（行），tr 包 <th>（表头格）/ <td>（数据格），层级不能乱。' },
      { term: 'colspan / rowspan', def: '跨列 / 跨行合并单元格，写课程表必备。合并后记得删掉被合并的格子。' },
      { term: '<thead> <tbody>', def: '表格的语义分区：表头与表体分开包，方便 CSS 控制和长表打印时每页重复表头。' },
      { term: 'border 与样式', def: 'HTML 属性 border 已过时，表格边框、间距统一用 CSS 控制（border-collapse: collapse 合并边框）。' },
    ],
  ],
  'html-ch4': [
    [ // 4.1 form 与 input
      { term: '<form>', def: '表单的容器，action 是提交地址、method 是提交方式（GET 拼在网址后，POST 藏在请求体里）。' },
      { term: '<input> 的 type', def: '一个标签千变万化：text 文本、password 密码（掩码）、radio 单选、checkbox 多选、date 日期、file 文件……' },
      { term: 'name 属性', def: '表单数据提交时的"字段名"，没有 name 的控件数据不会被提交——只写 id 是不行的。' },
      { term: '<label>', def: '<label for="控件id"> 把文字和控件绑定，点文字等于点控件，既好用又无障碍友好。' },
    ],
    [ // 4.2 下拉、文本域与验证
      { term: '<select> / <option>', def: '下拉选择框：select 包 option，option 的 value 是提交值，标签文字是显示值，两者可以不同。' },
      { term: '<textarea>', def: '多行文本域，rows/cols 控制大小。注意它没有 value 属性，初始内容写在标签之间。' },
      { term: 'HTML5 验证', def: 'required 必填、type="email" 邮箱格式、min/max 范围、pattern 正则——不写 JS 也能做基础校验。' },
      { term: '前端验证 ≠ 安全', def: 'HTML 验证用户随手就能绕过，只是提升体验；真正的校验必须在服务器再做一遍。' },
    ],
  ],
  'html-ch5': [
    [ // 5.1 音频与视频
      { term: '<audio> / <video>', def: '多媒体标签：src 指定文件，controls 显示播放条（不加用户没法播放）。' },
      { term: '<source>', def: '在 audio/video 里提供多个格式备选，浏览器挑第一个自己能播的，解决格式兼容问题。' },
      { term: 'autoplay 限制', def: '现代浏览器禁止有声自动播放（用户体验考虑），想自动播必须加 muted 静音。' },
    ],
    [ // 5.2 语义化标签
      { term: '语义化', def: '用"名字即含义"的标签：header 页头、nav 导航、main 主体、article 文章、aside 侧栏、footer 页脚，代替一锅 div。' },
      { term: '为什么要语义化', def: '搜索引擎更好收录（SEO）、读屏软件能导航（无障碍）、代码可读性高，三方受益。' },
      { term: '<div> 与 <span>', def: '无语义的万能容器：div 块级、span 行内。没有更合适语义标签时才用它们兜底。' },
      { term: '<figure> / <figcaption>', def: '配图与图注的标准组合，让图片和说明文字在语义上绑定在一起。' },
    ],
  ],
  'html-ch6': [
    [ // 6.1 CSS 引入与选择器
      { term: 'CSS', def: 'Cascading Style Sheets，层叠样式表，负责网页的"长相"：颜色、字体、布局、动画。HTML 是骨架，CSS 是皮肤。' },
      { term: '三种引入方式', def: '行内 style 属性、<style> 内嵌、<link> 外链 .css 文件。优先级：行内 > 内嵌/外链（后者看顺序），工程上推荐外链。' },
      { term: '选择器', def: '选中元素的模式：标签名 p、类 .box、ID #top、后代 div p、组合 .a.b。优先级 ID > 类 > 标签。' },
      { term: '层叠（Cascade）', def: '多条规则命中同一元素时的裁决机制：比优先级，同级比书写顺序（后写的赢），!important 掀桌子（慎用）。' },
    ],
    [ // 6.2 盒模型与常用属性
      { term: '盒模型', def: '每个元素都是一个盒子：content（内容）→ padding（内边距）→ border（边框）→ margin（外边距），一层包一层。' },
      { term: 'box-sizing', def: 'border-box 让 width 包含 padding 和 border，布局计算不再"越算越宽"，几乎所有项目开头都会设它。' },
      { term: 'margin 塌陷', def: '相邻元素的上下 margin 会合并取较大值，而不是相加——布局对不上时先怀疑它。' },
      { term: 'display', def: '元素的"显示角色"：block 独占一行、inline 行内、inline-block 两者折中、none 隐藏（不占位）。' },
    ],
    [ // 6.3 Flex 弹性布局入门
      { term: 'Flexbox', def: '弹性布局：容器设 display: flex，子元素自动排成一行（或一列），轻松实现居中和等分，现代布局主力。' },
      { term: '主轴与交叉轴', def: 'flex-direction 决定主轴方向（默认水平），justify-content 管主轴对齐，align-items 管交叉轴对齐。' },
      { term: '居中终极公式', def: 'display: flex; justify-content: center; align-items: center 三行解决世纪难题"垂直居中"。' },
      { term: 'flex: 1', def: '子元素平分剩余空间，做"三栏等分""一侧固定一侧自适应"布局的利器。' },
    ],
  ],
  // ================= 新增章节（第 9~10 章 / 7~8 章） =================
  'java-ch9': [
    [ // 9.1 Object 类三大方法
      { term: 'Object', def: 'Java 所有类的共同祖先。任何对象都能调用它的 toString、equals、hashCode 等方法。' },
      { term: 'toString()', def: '返回对象的字符串表示。不重写时打印出来是 类名@哈希值，重写后调试打印一目了然。' },
      { term: 'equals()', def: '判断两个对象"内容是否相等"。默认实现是 ==（比地址），想比内容必须自己重写。' },
      { term: 'hashCode()', def: '对象的哈希值，HashMap/HashSet 靠它分桶定位。约定：equals 相等 ⇒ hashCode 相等。' },
      { term: 'instanceof', def: '类型判断运算符：o instanceof Student 判断 o 是否是 Student（或其子类）的对象，强转前的安全闸。' },
    ],
    [ // 9.2 StringBuilder
      { term: 'StringBuilder', def: '可变的字符串缓冲区：append() 原地追加不新建对象，循环拼接的标配，最后 toString() 取结果。' },
      { term: '不可变性的代价', def: 'String 每次拼接都新建对象并复制内容，循环一万次就复制一万次——这就是慢的根源。' },
      { term: '链式调用', def: 'append 返回 this，所以可以 sb.append(a).append(b) 一路点下去，代码紧凑。' },
      { term: 'StringBuffer', def: 'StringBuilder 的线程安全版（方法加了同步锁），更慢。单线程用 StringBuilder 就够。' },
    ],
    [ // 9.3 包装类
      { term: '包装类', def: '给基本类型穿上的"对象外套"：int→Integer、double→Double。泛型容器只能装对象，所以必须有它们。' },
      { term: '装箱 / 拆箱', def: '基本类型 ↔ 包装类的自动转换。装箱：Integer n = 10；拆箱：int x = n。拆箱时 n 为 null 会抛空指针。' },
      { term: 'parseInt', def: 'Integer.parseInt("123") 把字符串转成 int，是"读入字符串 → 参与计算"的桥梁。' },
      { term: 'Math.random()', def: '返回 [0, 1) 的随机小数。要 1~6 的骰子就写 (int)(Math.random() * 6) + 1。' },
    ],
  ],
  'java-ch10': [
    [ // 10.1 File 类
      { term: 'File 类', def: '文件/目录路径的抽象（一张"名片"），只描述路径属性，new File 不会在磁盘上创建文件。' },
      { term: '绝对路径 / 相对路径', def: '绝对路径从盘符或根目录写起；相对路径以"程序启动目录"为基准——不是源文件目录，新手最易混淆。' },
      { term: 'exists() / mkdir()', def: 'exists 判断路径是否存在；mkdir 创建目录（父目录不存在时用 mkdirs 连父带子一起建）。' },
    ],
    [ // 10.2 字节流与字符流
      { term: '流（Stream）', def: 'Java 对一切输入输出的统一抽象：数据像水一样按顺序流过，来源可以是文件、网络、内存。' },
      { term: '字节流 vs 字符流', def: 'Stream 结尾的按字节读写（万能，图片音频都行）；Reader/Writer 结尾的按字符读写（自动处理编码，专管文本）。' },
      { term: '编码（Encoding）', def: '字符与字节之间的翻译表。UTF-8 是国际通用，GBK 是中文 Windows 默认——两端编码不一致就乱码。' },
      { term: 'try-with-resources', def: 'try (打开资源) { ... } 语法，出块自动 close()，异常也不漏，是现代 Java 管理资源的标准写法。' },
    ],
    [ // 10.3 缓冲流与 Files
      { term: '缓冲流', def: 'BufferedReader/Writer 给流加内存缓冲区，攒批读写磁盘，速度提升一个量级。读文本标配。' },
      { term: 'readLine()', def: '一次读一行，返回 null 表示读完：while ((line = r.readLine()) != null) 是逐行读的经典模板。' },
      { term: 'Files 工具类', def: 'java.nio.file.Files 提供一行式读写：readAllLines、write，小文件首选；大文件会占爆内存，仍用流。' },
    ],
  ],
  'py-ch7': [
    [ // 7.1 文件读写
      { term: 'open()', def: '打开文件的内置函数，返回文件对象。模式 "r" 读、"w" 覆盖写、"a" 追加，"b" 表示二进制。' },
      { term: 'with 语句', def: '上下文管理器：with open(...) as f 出的块结束自动关闭文件，是 Python 文件操作的官方姿势。' },
      { term: 'encoding="utf-8"', def: '显式指定编码的参数。不写就用系统默认（Windows 是 GBK），中文程序必须写，否则跨系统乱码。' },
      { term: '逐行迭代', def: 'for line in f 一行一行读，内存里始终只有一行，再大的日志文件也读得动。' },
      { term: 'strip()', def: '去掉字符串首尾空白（含换行符）。逐行读文件后几乎必用，否则每行结尾都带着 \\n。' },
    ],
    [ // 7.2 CSV 与 JSON
      { term: 'CSV', def: '逗号分隔值格式，本质是纯文本表格，Excel 直接可读。Python 用 csv 模块的 reader/writer 处理。' },
      { term: 'JSON', def: 'JavaScript Object Notation，网络传输事实标准，结构对应 Python 的字典和列表。' },
      { term: '序列化 / 反序列化', def: '对象 → 字符串叫序列化（json.dumps/dump）；字符串 → 对象叫反序列化（json.loads/load）。' },
      { term: 'ensure_ascii=False', def: 'json.dumps 的参数，让中文原样输出而不是 \\u4f60 这样的转义。' },
    ],
    [ // 7.3 模块与 pip
      { term: '模块（Module）', def: '一个 .py 文件就是一个模块，import 后就能用里面的函数和变量。' },
      { term: '包（Package）', def: '装模块的目录（含 __init__.py），numpy、requests 都是包。包是模块的集合。' },
      { term: 'pip / PyPI', def: 'pip 是包管理命令（install/list/uninstall）；PyPI 是官方第三方库仓库，几十万库随取随用。' },
      { term: '__name__', def: '内置变量：直接运行时值为 "__main__"，被 import 时值为模块名。配合 if 判断区分两种用途。' },
    ],
  ],
  'py-ch8': [
    [ // 8.1 math 与 random
      { term: 'math 模块', def: '数学函数库：sqrt、ceil、floor、gcd、pi……用前 import math。' },
      { term: 'randint 闭区间', def: 'random.randint(1, 6) 两端都包含（1~6 都可能），和 range 的"含头不含尾"相反，高频考点。' },
      { term: '随机种子 seed', def: 'random.seed(42) 固定后每次运行"随机"结果相同，用于复现实验和调试。' },
      { term: 'shuffle / sample / choice', def: '打乱列表、不重复抽样、随机抽一个——random 模块的日常三件套。' },
    ],
    [ // 8.2 datetime
      { term: 'datetime / date / timedelta', def: '时刻、日期、时间差三个核心类。datetime 相减得到 timedelta，.days 取间隔天数。' },
      { term: 'strftime / strptime', def: '时间→字符串（format）与字符串→时间（parse）。格式代码 %Y 年 %m 月 %d 日。' },
      { term: '时间戳', def: '从 1970-01-01 到现在的秒数（time.time()），是计算机存储时间的通用方式，比较和加减都方便。' },
    ],
    [ // 8.3 collections
      { term: 'Counter', def: '计数器字典：Counter(可迭代对象) 自动统计每个元素次数，most_common(n) 取前 n 名。' },
      { term: 'defaultdict', def: '带默认工厂的字典：defaultdict(list) 访问不存在的键自动建空列表，分组统计免判空。' },
      { term: 'deque', def: '双端队列，两端进出都是 O(1)。当队列用比 list 快得多（list 头部删除要整体搬移）。' },
    ],
  ],
  'cpp-ch7': [
    [ // 7.1 指针运算与指针数组
      { term: '指针算术', def: 'p + 1 前进"一个元素"（int* 是 4 字节）而不是一个字节。类型决定了步长。' },
      { term: '指针数组', def: 'int *arr[5]：数组，元素都是指针。读法：arr 先遇 [5] 是数组，每个元素是 int*。' },
      { term: '数组指针', def: 'int (*p)[5]：指针，指向整个数组。括号让 p 先结合 *，一字之差天壤之别。' },
      { term: 'argv', def: 'main(int argc, char *argv[]) 的参数列表，是指针数组：argv[0] 程序名，其后是命令行参数。' },
    ],
    [ // 7.2 二级指针
      { term: '二级指针', def: 'int **pp 存"指针的地址"：*pp 是中间的指针，**pp 才是最终的值。' },
      { term: '修改调用者的指针', def: '函数要改变实参指针本身，必须传指针的地址（int**）或指针引用（int*&），否则改的只是副本。' },
      { term: '指针的引用（int*&）', def: 'C++ 对二级指针的优雅替代：函数里直接 p = new int 就改了调用者的指针。' },
    ],
    [ // 7.3 函数指针
      { term: '函数指针', def: '存函数地址的指针：int (*fp)(int,int) = add，fp(1,2) 等价 add(1,2)。函数名本身就是地址。' },
      { term: '回调（Callback）', def: '把函数当参数传给别的函数，由对方在合适时机调用。排序的比较函数就是回调。' },
      { term: 'lambda 表达式', def: '[](int a, int b){ return a < b; } 匿名小函数，C++11 起是写回调的首选。' },
    ],
  ],
  'cpp-ch8': [
    [ // 8.1 vector/string 高频操作
      { term: 'reserve 与 capacity', def: 'vector 的 size 是元素数、capacity 是底层容量。reserve(n) 预留容量避免反复扩容搬家，性能优化常用手法。' },
      { term: '[] 与 at()', def: '[] 不检查越界（快但危险），at() 越界抛 out_of_range 异常（慢但安全）。' },
      { term: 'string::npos', def: 'find 查找失败时的返回值（一个巨大的特殊值）。判断没找到必须和 npos 比，不能和 -1 比。' },
      { term: 'stoi / to_string', def: '字符串与数字互转：stoi("123")=123，to_string(4.5)="4.500000"。解析失败会抛异常。' },
    ],
    [ // 8.2 set 与 unordered 系列
      { term: 'set（有序集合）', def: '自动去重 + 自动排序，底层红黑树，操作 O(log n)。需要"有序的互不重复"就用它。' },
      { term: 'unordered_map/set', def: '哈希表版本：无序但平均 O(1)。只要快、不要顺序时的首选。' },
      { term: '红黑树', def: '一种自平衡二叉搜索树，map/set 的底层实现，保证最坏情况也有 O(log n)。' },
      { term: 'map[] 的副作用', def: 'm[key] 在键不存在时会插入默认值再返回引用。纯查询请用 find/count，避免污染数据。' },
    ],
    [ // 8.3 迭代器与算法库
      { term: '迭代器区间 [begin, end)', def: 'STL 算法统一接受的"左闭右开"区间：begin 指向首元素，end 指向末元素之后（哨兵，不可解引用）。' },
      { term: 'algorithm 库', def: '#include <algorithm>：sort、reverse、count、find、max_element……所有容器通用，靠迭代器解耦。' },
      { term: 'accumulate', def: '#include <numeric> 里的求和函数：accumulate(begin, end, 初值)，初值类型决定结果类型。' },
      { term: '结构化绑定', def: 'C++17 的 for (auto &[k, v] : map) 写法，直接拆出键和值；加 & 避免拷贝还能修改。' },
    ],
  ],
  'c-ch7': [
    [ // 7.1 指针数组与数组指针
      { term: '指针数组', def: 'int *arr[5]：装指针的数组。字符串表 char *days[] = {"Mon", ...} 是经典用法。' },
      { term: '数组指针', def: 'int (*p)[5]：指向整个数组的指针，+1 跳过整个数组。二维数组传参会用到。' },
      { term: '声明优先级', def: '[] 优先级高于 *：没括号先当数组，有括号 (*p) 先当指针。读声明从变量名出发"右左右"。' },
      { term: '字符串常量', def: '"Mon" 存在只读区，char *p = "Mon" 可以指向它，但 p[0] = \'m\' 是未定义行为（可能崩溃）。' },
    ],
    [ // 7.2 二级指针
      { term: '二级指针', def: '指向指针的指针 int **pp。内存模型是两级跳转链：pp → p → 数据。' },
      { term: '传址改指针', def: 'C 只有值传递：函数要改调用者的指针，就得传指针的地址（int**），正如改 int 要传 int*。' },
      { term: 'malloc 与二级指针', def: '封装分配函数时常见：void alloc(int **pp) { *pp = malloc(...); }，调用处传 &p。' },
    ],
    [ // 7.3 函数指针与 qsort
      { term: '函数指针', def: 'int (*fp)(int, int) = max; 存函数地址，使函数可以像数据一样传递。' },
      { term: '回调机制', def: '你写比较规则、库负责流程——qsort 排序任何类型都行，秘诀就是函数指针回调。' },
      { term: 'void* 通用指针', def: 'qsort 比较函数用 const void* 接收任意类型，使用前必须强制转回真实类型再解引用。' },
      { term: '升序比较约定', def: 'return *(int*)a - *(int*)b 为升序；交换 a、b 得降序。负前正后零相等。' },
    ],
  ],
  'c-ch8': [
    [ // 8.1 枚举与 typedef
      { term: '枚举 enum', def: '一组命名整数常量：enum { MON = 1, TUE } 自动递增。让代码用名字而不是魔法数字。' },
      { term: '魔法数字', def: '代码里莫名出现的裸数字（如 if (x == 3)），含义全靠猜。用枚举或宏给它起名字。' },
      { term: 'typedef', def: '类型别名：typedef unsigned int uint。不产生新类型，只是换个名字，结构体别名最常用。' },
    ],
    [ // 8.2 位运算实战
      { term: '位运算符', def: '& 与、| 或、^ 异或、~ 取反、<< 左移、>> 右移，直接操作二进制位，效率最高。' },
      { term: '掩码（Mask）', def: '用来"选中特定位"的数：flags & MASK 取出、flags | MASK 置位、flags & ~MASK 清零。' },
      { term: '异或自反性', def: 'x ^ x = 0，0 ^ x = x。由此衍生交换两数、找唯一落单数等经典技巧。' },
      { term: '移位即乘除', def: 'n << k 等于 n × 2^k，n >> k 等于 n ÷ 2^k（向负无穷取整），比乘除法快。' },
    ],
    [ // 8.3 多文件工程
      { term: '头文件 .h', def: '放"声明"（函数原型、类型定义、宏），供多个 .c 文件共享，自己不放实现（inline 除外）。' },
      { term: '声明 vs 定义', def: '声明说"有这么个东西"（可多次），定义"真正分配内存/给出实现"（只能一次）。' },
      { term: 'extern', def: '声明变量/函数定义在别的文件：extern int g_count; 只引不建。' },
      { term: '分别编译与链接', def: 'gcc -c a.c 生成 a.o，再 gcc a.o b.o -o app 链接。改一个文件只需重编它，大项目的省时基础。' },
    ],
  ],
  'html-ch7': [
    [ // 7.1 position
      { term: 'relative', def: '相对自己原位偏移，不脱离文档流；最重要的用途是给 absolute 子元素当定位参照。' },
      { term: 'absolute', def: '相对最近的非 static 祖先定位，脱离文档流。父级忘了设 relative 就会贴到 body 上。' },
      { term: 'fixed', def: '相对浏览器窗口定位，滚动不动。吸顶导航、悬浮按钮的标配。' },
      { term: 'sticky', def: '平时正常排版，滚到阈值吸住不动——表头吸顶神器，比 fixed 省事。' },
      { term: 'z-index', def: '定位元素的"楼层号"，数值大者压在上层。只在定位元素上生效。' },
    ],
    [ // 7.2 Grid
      { term: 'Grid 网格布局', def: '二维布局系统：同时控制行和列。Flex 管一维，Grid 管二维，两者互补。' },
      { term: 'fr 单位', def: '剩余空间的"份额"：1fr 2fr 表示按 1:2 分剩余宽度，固定列先扣除。' },
      { term: 'repeat() 与 gap', def: 'repeat(3, 1fr) 快速写三等分；gap 统一设格子间距，告别逐个算 margin。' },
      { term: 'span 跨格', def: 'grid-column: span 2 让格子横跨两列，不规则画册式排版的关键。' },
    ],
    [ // 7.3 响应式
      { term: '响应式设计', def: '一套网页适配所有屏幕：流动布局 + 按宽度切换样式，而不是给每个设备写一套。' },
      { term: '媒体查询 @media', def: '按条件启用 CSS：@media (max-width: 768px) 内的规则只在小屏生效。' },
      { term: '移动优先', def: '先写手机样式，再用 min-width 逐档增强到大屏。代码更少、逻辑更顺，业界主流。' },
      { term: '相对单位', def: '% 相对父级、vw/vh 相对视口、rem 相对根字号。多用它们，布局自带弹性。' },
    ],
  ],
  'html-ch8': [
    [ // 8.1 JS 引入与语法
      { term: 'JavaScript', def: '浏览器内置的编程语言，负责网页交互逻辑。与 Java 的关系≈老婆饼与老婆。' },
      { term: '<script> 位置', def: '放 body 末尾最稳妥：等 HTML 加载完再执行，JS 才找得到页面元素。' },
      { term: 'let / const / var', def: 'let 变量、const 常量（默认优先用它），var 是历史遗留（有提升等怪癖），新项目别用。' },
      { term: '箭头函数', def: 'const f = (a, b) => a + b 的简写形式，回调里最常见。' },
      { term: 'console.log', def: '输出到浏览器控制台（F12），JS 调试的 printf。' },
    ],
    [ // 8.2 DOM
      { term: 'DOM', def: '文档对象模型：HTML 在内存中的节点树，JS 通过它读写页面的一切。' },
      { term: 'querySelector', def: '用 CSS 选择器找元素：document.querySelector("#id" / ".class" / "标签")，加 All 找全部。' },
      { term: 'textContent vs innerHTML', def: '前者纯文本（安全），后者解析 HTML（拼接用户输入会有 XSS 风险）。' },
      { term: 'classList', def: '操作类名的 API：add/remove/toggle，把样式留在 CSS 里，JS 只切换类名——关注点分离。' },
      { term: 'createElement / append', def: '动态建元素：createElement 创建、append 挂载、remove 删除。' },
    ],
    [ // 8.3 事件与计时器
      { term: '事件（Event）', def: '用户动作的通知：click、input、keydown、submit……JS 靠监听事件实现交互。' },
      { term: 'addEventListener', def: '标准监听写法：el.addEventListener("click", fn)，可挂多个、可移除，优于 el.onclick。' },
      { term: '事件对象 e', def: '回调第一个参数：e.target 是谁触发的，e.preventDefault() 阻止默认行为（如表单跳转）。' },
      { term: 'setTimeout / setInterval', def: '延时执行一次 / 周期重复执行，配 clearTimeout/clearInterval 停止。倒计时、轮播的基础。' },
    ],
  ],
  // ============ 扩充章节（每语言 15 章计划） ============
  'java-ch11': [
    [
      { term: 'Lambda', def: '匿名函数简写 (参数) -> { 代码 }，让函数可以像值一样传递，Java 8 引入。' },
      { term: '函数式接口', def: '只含一个抽象方法的接口（如 Runnable、Comparator），Lambda 的合法目标类型。' },
      { term: '@FunctionalInterface', def: '标注函数式接口的注解，让编译器帮忙检查"只有一个抽象方法"。' },
    ],
    [
      { term: '方法引用', def: 'Lambda 的极简形式：System.out::println 等价 x -> System.out.println(x)，用 :: 连接。' },
      { term: '构造引用', def: 'ArrayList::new 这样的写法，把构造方法当函数传递。' },
      { term: '静态方法引用', def: 'Math::max 形式，等价于 (a,b) -> Math.max(a,b)。' },
    ],
    [
      { term: 'Stream', def: '集合的流水线抽象：数据源 → 中间操作 → 终端操作，不存数据、不改原集合。' },
      { term: '中间操作 / 终端操作', def: 'filter/map/sorted 是中间操作（懒执行，返回新流）；collect/forEach 是终端操作（触发整条流水线）。' },
      { term: 'Collectors', def: '收集器工厂：toList() 收成列表、joining(",") 拼字符串、groupingBy 分组。' },
    ],
  ],
  'java-ch12': [
    [
      { term: '线程', def: '程序执行的最小单位，同一进程内多线程共享内存、并发执行。' },
      { term: 'start 与 run', def: 'start() 才真正创建新线程并异步调 run()；直接调 run() 只是普通方法调用。' },
      { term: 'Runnable', def: '只有 run() 一个方法的函数式接口，描述"要执行的任务"，与线程本体分离。' },
    ],
    [
      { term: '线程安全', def: '多线程并发读写共享数据时结果仍正确的性质；count++ 这类复合操作是重灾区。' },
      { term: 'synchronized', def: '内置锁：同一时刻只允许一个线程进入被保护的代码块/方法。' },
      { term: '原子操作', def: '不可再分的一步操作（如 AtomicInteger.incrementAndGet），天然线程安全。' },
    ],
    [
      { term: 'sleep / join', def: 'sleep 让当前线程暂停指定毫秒；join 等另一个线程跑完再继续。' },
      { term: 'interrupt', def: '"礼貌叫停"机制：只设中断标志，线程自己检查并退出；过时的 stop() 强杀已废弃。' },
      { term: '线程池', def: '复用固定数量线程执行任务的池子（ExecutorService），避免反复创建销毁线程的开销。' },
    ],
  ],
  'java-ch13': [
    [
      { term: '正则表达式', def: '用符号描述文本模式的迷你语言：\\d 数字、\\w 单词字符、* 零到多次、+ 一到多次。' },
      { term: '贪婪与懒惰', def: '量词默认贪婪（能多吃就多吃）；后面加 ? 变懒惰（能少吃就少吃），如 .*?。' },
      { term: '捕获组', def: '括号 () 圈住的部分会被记住，之后可用 $1、group(1) 引用其内容。' },
    ],
    [
      { term: 'matches', def: 'String.matches(regex) 要求整个字符串完全符合模式，常用于校验。' },
      { term: 'split 按正则切分', def: '"a, b;c".split("[,;]\\\\s*") 一次按多个分隔符切开。' },
      { term: 'replaceAll 与 $1', def: '按正则替换，替换串里 $1 引用第一个捕获组，可重排内容。' },
    ],
    [
      { term: 'Pattern', def: '编译好的正则对象：Pattern.compile() 一次编译反复使用，比每次现编译快。' },
      { term: 'Matcher', def: '匹配器：find() 循环找下一个匹配，group() 取出内容，group(1) 取第一组。' },
      { term: 'matches vs find', def: 'matches 整串匹配（校验用）；find 串中寻找片段（提取用）。' },
    ],
  ],
  'java-ch14': [
    [
      { term: 'var', def: '局部变量类型推断（Java 10+）：编译器按右边表达式确定类型，静态类型不变。' },
      { term: '类型推断', def: '编译器根据上下文自动算出类型的机制，var 推断后类型固定不可再变。' },
      { term: 'Diamond 运算符', def: 'new ArrayList<>() 中的 <> 也是推断，比 var 更早（Java 7）。' },
    ],
    [
      { term: 'record', def: '记录类（Java 16+）：一行定义不可变数据类，自动生成构造、getter、equals、hashCode、toString。' },
      { term: '不可变对象', def: '创建后状态不能改的对象（字段全 final、无 setter），天然线程安全。' },
      { term: 'POJO / DTO', def: '纯数据对象 / 数据传输对象：只有字段没有业务逻辑的类，record 的最佳场景。' },
    ],
    [
      { term: 'switch 表达式', def: '箭头语法 case 1 -> "一" 不穿透；switch 可整体当表达式返回值，块内用 yield 返回。' },
      { term: '文本块', def: '""" 包裹的多行字符串（Java 15+），写 SQL/JSON 不再需要转义和拼接。' },
      { term: '模式匹配 instanceof', def: 'if (o instanceof String s) 判断+强转一步完成，变量 s 直接使用。' },
    ],
  ],
  'java-ch15': [
    [
      { term: '单例模式', def: '保证全程序只有一个实例的模式：私有构造 + 静态方法发放唯一实例。' },
      { term: '饿汉式 / 懒汉式', def: '饿汉：类加载即创建（简单）；懒汉：用时才建（省资源但要处理线程安全）。' },
      { term: '双重检查锁', def: '懒汉式的线程安全优化：两次判空夹一次加锁，兼顾性能与安全。' },
    ],
    [
      { term: '工厂模式', def: '把对象创建集中到工厂方法，调用方只要"要什么"不管"怎么 new"。' },
      { term: '开闭原则', def: '对扩展开放、对修改关闭：新增产品不改老代码，加分支进工厂即可。' },
      { term: '解耦', def: '降低模块间直接依赖。工厂让调用方不认识具体类，只认接口。' },
    ],
    [
      { term: '观察者模式', def: '一对多的订阅通知：主题状态一变，所有订阅者自动收到 update。' },
      { term: 'Subject / Observer', def: '被观察者维护订阅列表并负责通知；观察者实现 update 接收通知。' },
      { term: '事件驱动', def: '观察者模式的应用形态：按钮点击、消息队列、数据绑定皆由此派生。' },
    ],
  ],
  'py-ch9': [
    [
      { term: '可迭代对象', def: '实现了 __iter__() 的对象（列表、字符串、文件……），可以被 for 遍历。' },
      { term: '迭代器', def: 'iter() 的产物：next() 逐个取值，取完抛 StopIteration，只能完整走一遍。' },
      { term: 'StopIteration', def: '迭代结束的"暗号"：for 循环捕获它后正常退出，不当作错误。' },
    ],
    [
      { term: 'yield', def: '生成器关键字：交出一个值并暂停函数，下次 next() 从暂停处继续。' },
      { term: '生成器', def: '含 yield 的函数调用后返回的惰性迭代器：现用现算，常数内存。' },
      { term: '惰性求值', def: '需要时才计算的策略。生成器表达式 (x for x in ...) 不立即产生任何数据。' },
    ],
    [
      { term: '生成器管道', def: '多个生成器首尾相接：读→过滤→转换，数据逐条流过、不落盘不占内存。' },
      { term: '内存恒定', def: '生成器任意时刻只持有当前元素，处理百 G 文件内存也不增长。' },
      { term: '一次性消费', def: '生成器遍历完就空了，再次遍历得到空——需要复用就请转 list。' },
    ],
  ],
  'py-ch10': [
    [
      { term: '一等公民', def: '函数可以赋值、传参、当返回值——和数字字符串地位相等，这是装饰器的前提。' },
      { term: '闭包', def: '内层函数记住外层作用域变量的现象，装饰器的包装函数就靠它记住原函数。' },
      { term: '函数对象', def: '不带括号的函数名是对象本身；带括号才是调用。f = print 后 f("hi") 可用。' },
    ],
    [
      { term: '装饰器', def: '接收函数、返回新函数的函数；@deco 等价于 f = deco(f)，是语法糖。' },
      { term: '*args, **kwargs', def: '万能参数收集：任意位置参数打包成元组、关键字参数打包成字典，装饰器透传必备。' },
      { term: 'functools.wraps', def: '把原函数的名字和文档复制给包装函数的装饰器，写装饰器必加。' },
    ],
    [
      { term: '带参装饰器', def: '@repeat(3) 需要先调 repeat(3) 得到装饰器，所以比普通装饰器多嵌套一层函数。' },
      { term: 'lru_cache', def: '标准库缓存装饰器：记住算过的结果，递归 fib 加它立刻从指数变线性。' },
      { term: '装饰器叠加顺序', def: '@a @b def f 等价 f = a(b(f))：离函数最近的装饰器先生效（从下往上包）。' },
    ],
  ],
  'py-ch11': [
    [
      { term: '原始字符串', def: 'r"\\d+" 前缀 r 让反斜杠不转义，写正则的推荐姿势，避免双重转义。' },
      { term: '字符类与量词', def: '\\d \\w \\s [abc] 描述"什么字符"；* + ? {n,m} 描述"来几次"。' },
      { term: '锚点', def: '^ 开头、$ 结尾、\\b 单词边界——它们不占字符，只声明位置。' },
    ],
    [
      { term: 'match / search / fullmatch', def: '开头匹配 / 全文找第一个 / 整串匹配。校验用 fullmatch，提取用 search 或 findall。' },
      { term: 'findall', def: '返回所有匹配组成的列表；模式含分组时返回各组内容。' },
      { term: 're.sub', def: '正则替换：re.sub(r"\\d", "*", s) 打码；替换串中 \\1 引用捕获组。' },
    ],
    [
      { term: 're.compile', def: '预编译模式对象，同一正则反复用时省去每次解析，循环中提速明显。' },
      { term: '贪婪陷阱', def: '<.+> 会吞到最后一对标签；改 <.+?> 懒惰匹配逐对提取。' },
      { term: 're.S (DOTALL)', def: '让 . 也匹配换行符的标志，跨行匹配时必加。' },
    ],
  ],
  'py-ch12': [
    [
      { term: 'HTTP 请求', def: '浏览器/爬虫与网站对话的方式：GET 取数据、POST 提交数据。' },
      { term: '状态码', def: '200 成功、301/302 跳转、403 拒绝、404 不存在、500 服务器错误。' },
      { term: 'User-Agent', def: '标识客户端身份的请求头，爬虫带上它伪装浏览器，否则易被 403。' },
    ],
    [
      { term: 'BeautifulSoup', def: '把 HTML 源码解析成可查询节点树的第三方库：find/find_all/select 三大查找。' },
      { term: 'CSS 选择器', def: 'soup.select(".post a") 用 .class、#id、空格后代等规则精准定位元素。' },
      { term: 'tag.text 与 tag["href"]', def: '取标签内纯文本 / 取标签属性值，提取数据的两把钳子。' },
    ],
    [
      { term: 'robots.txt', def: '网站根目录下的爬虫告示牌，声明哪些路径不欢迎抓取，请尊重。' },
      { term: '频率控制', def: '请求间 time.sleep(1) 以上，高频抓取会给服务器造成压力甚至构成攻击。' },
      { term: '动态渲染', def: '数据由 JS 运行时生成，requests 拿不到；需 Selenium 或直接请求数据接口。' },
    ],
  ],
  'py-ch13': [
    [
      { term: 'super()', def: '调用父类方法的通道：子类构造里 super().__init__(...) 把父类部分交给父类初始化。' },
      { term: 'MRO', def: '方法解析顺序：多继承时同名方法的查找顺序，C.__mro__ 可查看。' },
      { term: 'isinstance / issubclass', def: '判断对象是不是某类（含子类）实例 / 判断类间继承关系。' },
    ],
    [
      { term: '@classmethod', def: '类方法：首参是 cls 而非 self，常用于"另一种构造方式"（如 from_diameter）。' },
      { term: '@staticmethod', def: '静态方法：无 self/cls，挂在类名下的普通工具函数。' },
      { term: '@property', def: '把方法伪装成属性：c.area 不加括号即可调用；配 setter 可加校验。' },
    ],
    [
      { term: '鸭子类型', def: '"走像鸭子就是鸭子"：只看对象有没有所需方法，不看继承关系。' },
      { term: '抽象基类（ABC）', def: 'abc 模块提供正式契约：@abstractmethod 标记的方法子类必须实现。' },
      { term: '@abstractmethod', def: '抽象方法标记：含它的类不能直接实例化，强迫子类补全实现。' },
    ],
  ],
  'py-ch14': [
    [
      { term: 'assert 断言', def: 'assert 条件, "提示"：条件不成立立刻抛 AssertionError，把 bug 拦在源头附近。' },
      { term: '防御式编程', def: '先校验再动手：入口检查参数合法性，异常数据不进入核心逻辑。' },
      { term: '-O 优化模式', def: 'python -O 运行时所有 assert 被移除——正式校验请用 if + raise。' },
    ],
    [
      { term: '单元测试', def: '针对最小功能单元的自动化测试：写一次永久生效，改代码跑一遍防回归。' },
      { term: 'TestCase', def: 'unittest 的测试基类：test_ 开头的方法自动识别为用例。' },
      { term: 'setUp / tearDown', def: '每个测试前/后自动执行的钩子，用于准备和清理公共环境。' },
    ],
    [
      { term: 'pdb / breakpoint()', def: '内置断点调试器：代码插 breakpoint()，运行到即暂停，n 单步、c 继续、p 查变量。' },
      { term: 'logging', def: '正式日志模块：分级（DEBUG→ERROR）、可开关、可写文件，print 的职场替代。' },
      { term: '二分定位法', def: '注释一半代码看 bug 是否还在，逐次缩小包围圈——高效调试心法。' },
    ],
  ],
  'py-ch15': [
    [
      { term: '持久化', def: '把内存数据写入文件/数据库，程序关掉数据还在。本项目用 JSON 文件实现。' },
      { term: '数据模型设计', def: '先定数据结构再写功能：{姓名: {phone: ...}} 的字典嵌套让查找 O(1)。' },
      { term: '单一职责', def: '一个函数只干一件事：add/delete/search 各自独立，菜单只负责分发。' },
    ],
    [
      { term: 'pop(name, None)', def: '带默认值的删除：键不存在返回 None 而不抛 KeyError，删除场景的优雅写法。' },
      { term: '模糊匹配', def: 'keyword in name 的子串判断实现搜索，比精确匹配更贴合用户习惯。' },
      { term: '即时存档', def: '每次修改后立即写盘，崩溃也不丢数据——用写盘频率换数据安全。' },
    ],
    [
      { term: '输入校验', def: '用正则和判空挡掉非法输入，脏数据永远不进数据层。' },
      { term: '异常兜底', def: '菜单循环整体包 try/except：单条命令出错不拖垮整个程序。' },
      { term: '三层架构', def: '数据层（文件）/ 逻辑层（功能函数）/ 界面层（菜单），放大就是真实软件结构。' },
    ],
  ],
  'cpp-ch9': [
    [
      { term: 'RAII', def: '资源获取即初始化：资源生命周期绑定对象生命周期，析构时自动释放。' },
      { term: '栈展开', def: '抛异常时逐层退出函数并调用局部对象析构的过程——RAII 在异常下仍可靠的原因。' },
      { term: '析构函数', def: '~类名()，对象销毁时自动执行，是 RAII 释放资源的落脚点。' },
    ],
    [
      { term: 'unique_ptr', def: '独占式智能指针：离开作用域自动 delete，不可复制只能 move，零开销。' },
      { term: 'make_unique', def: '创建 unique_ptr 的工厂函数，比裸 new 更安全简洁。' },
      { term: '所有权转移', def: 'std::move(p) 把资源所有权转给新指针，原指针置空。' },
    ],
    [
      { term: 'shared_ptr', def: '共享式智能指针：引用计数归零才释放，适合多个所有者的场景。' },
      { term: '引用计数', def: '记录有多少个 shared_ptr 指向同一对象，最后一个销毁时释放内存。' },
      { term: 'weak_ptr', def: '弱引用：不计数、可观察，lock() 临时升级为 shared_ptr，破解循环引用。' },
    ],
  ],
  'cpp-ch10': [
    [
      { term: '函数模板', def: 'template <typename T> 定义的"代码配方"：编译器按实参类型生成专属版本。' },
      { term: '模板参数推断', def: 'myMax(3,5) 自动推断 T=int；推断冲突（int+double）直接编译报错。' },
      { term: '实例化', def: '编译器把模板"展开"成具体类型代码的过程，发生在编译期。' },
    ],
    [
      { term: '类模板', def: '整个类按类型参数化：vector<int> 与 vector<string> 是同一模板的不同实例。' },
      { term: '非类型模板参数', def: 'template <typename T, int N> 中的 N：编译期常量，std::array 的长度就是这么定的。' },
      { term: 'template 头', def: '类外定义成员函数时每个都要重复 template <typename T> 和 Box<T>:: 前缀。' },
    ],
    [
      { term: 'STL 与模板', def: 'STL 容器和算法全是模板实现，所以一份 sort 能排任何可比较类型。' },
      { term: '模板错误信息', def: '实例化失败时报错又臭又长，读第一层错误（哪个操作不满足）是关键。' },
      { term: 'concepts', def: 'C++20 的模板约束：requires 子句限定模板参数必须支持的操作，报错瞬间友好。' },
    ],
  ],
  'cpp-ch11': [
    [
      { term: 'throw', def: '抛出异常对象：函数立即中止，沿调用链栈展开寻找 catch。' },
      { term: '标准异常', def: '<stdexcept> 家族：runtime_error、invalid_argument、out_of_range 等，都带 what()。' },
      { term: '栈展开', def: '异常沿调用链逐层退出，每层局部对象正常析构——RAII 与异常配合的根基。' },
    ],
    [
      { term: 'try-catch', def: 'try 包住可能抛异常的代码，catch 按类型捕获处理，先子类后父类排列。' },
      { term: 'catch(...)', def: '捕获一切异常的最后兜底，通常用于日志和优雅退出。' },
      { term: 'e.what()', def: '标准异常的描述信息接口，打印日志必用。' },
    ],
    [
      { term: 'noexcept', def: '承诺函数不抛异常的标记：帮助编译器优化，影响 vector 扩容策略。' },
      { term: '异常安全级别', def: '基本保证（不泄漏）、强保证（可回滚）、不抛保证（noexcept）三档。' },
      { term: '异常 vs 错误码', def: '预期内失败（查无此项）用返回值；异常留给"无法继续"的严重错误。' },
    ],
  ],
  'cpp-ch12': [
    [
      { term: 'fstream', def: '文件流家族：ifstream 读、ofstream 写、fstream 读写，用法与 cin/cout 一致。' },
      { term: 'ios::app', def: '追加打开模式：不清空原内容写末尾；默认打开会清空文件。' },
      { term: '流的 RAII', def: 'fstream 对象析构自动关文件，离开作用域即安全，无需手动 close。' },
    ],
    [
      { term: '流状态位', def: 'good/eof/fail/bad 四个状态；while (in >> x) 靠 fail 状态自动结束。' },
      { term: 'getline', def: '按行读取（可含空格），配 stringstream 行内解析是处理 CSV 的套路。' },
      { term: 'clear / ignore', def: 'clear() 复位错误状态；ignore() 丢弃坏输入——读失败后修复流的两步。' },
    ],
    [
      { term: 'stringstream', def: '内存中的流：从字符串按类型拆数据，或把多种数据拼成字符串。' },
      { term: 'stoi / to_string', def: '字符串与数字互转的库函数，解析失败抛 invalid_argument。' },
      { term: 'clear + str("")', def: '复用 stringstream 前必须两步：清状态标志 + 清内容缓冲。' },
    ],
  ],
  'cpp-ch13': [
    [
      { term: 'Lambda', def: '[捕获](参数){ 体 } 就地定义匿名函数，配 STL 算法天作之合。' },
      { term: '捕获列表', def: '[] 不捕获、[&] 全引用、[=] 全值、[x,&y] 按需——决定 Lambda 能看到什么。' },
      { term: '值捕获 vs 引用捕获', def: '值捕获是定义时拍照（副本）；引用捕获是实时监控（注意生命周期）。' },
    ],
    [
      { term: 'auto', def: '编译器自动推断类型：auto it = v.begin() 免去长类型名，初见不明类型的场景慎用。' },
      { term: '范围 for', def: 'for (const auto& x : v) 遍历容器黄金写法：不拷贝、不可改、全类型通吃。' },
      { term: '结构化绑定', def: 'auto [k, v] = pair 直接拆包（C++17），遍历 map 时代码清爽一半。' },
    ],
    [
      { term: '移动语义', def: '把大对象的内部资源直接"偷"给新对象而非拷贝，性能关键优化。' },
      { term: '右值与 &&', def: '右值是将亡的临时值；右值引用 && 能绑定它们，移动构造/赋值的参数类型。' },
      { term: 'std::move', def: '把变量标记为"可搬走"；move 后变量有效但内容未指定，别再用。' },
    ],
  ],
  'cpp-ch14': [
    [
      { term: '栈（Stack）', def: '后进先出（LIFO）结构：push 压入、pop 弹出、top 看顶，像叠盘子。' },
      { term: '容器适配器', def: 'std::stack/queue 不自己存数据，而是包在 deque 等容器上提供受限接口。' },
      { term: '括号匹配', def: '栈的经典应用：左括号入栈、右括号弹栈比对，栈空才合法。' },
    ],
    [
      { term: '队列（Queue）', def: '先进先出（FIFO）：队尾 push、队头 front/pop，像排队买票。' },
      { term: 'deque', def: '双端队列：两头进出都 O(1)，滑动窗口类题目的专用容器。' },
      { term: 'priority_queue', def: '优先队列（堆实现）：队头永远是最大/最小值，动态取最值场景专用。' },
    ],
    [
      { term: '链表', def: '节点存数据+next 指针串成的链：插入删除 O(1)，随机访问 O(n)。' },
      { term: '头插法', def: '新节点指向旧头再成为新头：最简单的建表方式，但得到逆序表。' },
      { term: '快慢指针', def: '快两步慢一步：找中点（快到时慢在中点）、判环（有环必相遇）。' },
    ],
  ],
  'cpp-ch15': [
    [
      { term: 'sync_with_stdio(false)', def: '关闭 cin/cout 与 stdio 的同步，输入输出提速数倍；之后不能再混用两套 IO。' },
      { term: 'cin.tie(nullptr)', def: '解除 cin 与 cout 的绑定（默认 cin 前强制刷 cout），进一步提速。' },
      { term: '快读', def: 'getchar 逐字符解析整数的手写读入函数，比 cin 快一个量级，百万级输入必备。' },
    ],
    [
      { term: 'bits/stdc++.h', def: '包含全部标准库的头文件，竞赛标配；工程中因拖慢编译不建议使用。' },
      { term: 'INF = 0x3f3f3f3f', def: '竞赛约定的"无穷大"：约 1e9、相加不溢出、且四字节相同可用 memset 填充。' },
      { term: 'using 别名', def: 'using ll = long long; 缩短类型名，竞赛模板标配。' },
    ],
    [
      { term: '对拍', def: '暴力程序与正解程序对随机数据比对输出，快速定位正解错误的调试法。' },
      { term: 'freopen', def: 'freopen("in.txt","r",stdin) 把文件当标准输入，本地调试神器，提交前注释掉。' },
      { term: '复杂度估算', def: '每秒约 1e8 次运算：n≤5000 想 O(n²)，n≤1e5 想 O(n log n)，n≤1e6 必须 O(n)。' },
    ],
  ],
  'c-ch9': [
    [
      { term: "'\\0' 结束符", def: 'C 字符串的唯一边界标志，所有字符串函数靠它知道哪里停。' },
      { term: '手写库函数', def: '面试常考：strlen/strcpy/strcmp 的本质都是"遍历到 \\0 停"的循环。' },
      { term: '指针紧缩写法', def: 'while ((*d++ = *s++)); 把复制、移动、判断压进一行，C 的经典风格。' },
    ],
    [
      { term: 'fgets', def: '限定长度的安全行读入函数，替代危险的 gets/scanf("%s")。' },
      { term: 'strcspn', def: '找第一个属于指定字符集的位置：s[strcspn(s,"\\n")]=0 去掉 fgets 留下的换行。' },
      { term: 'snprintf / sscanf', def: '格式化进字符串 / 从字符串按格式拆数据，都带边界检查意识。' },
    ],
    [
      { term: 'strtok', def: '按分隔符切字符串：首传字符串后传 NULL 续切；会修改原串且有静态状态。' },
      { term: 'ctype.h', def: '字符分类库：isdigit/isalpha/isspace/toupper/tolower，比手写范围判断可靠。' },
      { term: '回文判断', def: '双指针从两头向中间对比，i >= j 时全部相等即回文。' },
    ],
  ],
  'c-ch10': [
    [
      { term: 'malloc', def: '堆上申请指定字节数，返回 void* 需转型，失败返回 NULL 必须检查。' },
      { term: 'sizeof *p', def: 'malloc(n * sizeof *p) 让类型跟随指针，改类型时不用同步修改——防御性写法。' },
      { term: 'calloc', def: '申请并清零的内存分配：calloc(n, size)，适合数组；malloc 不初始化是垃圾值。' },
    ],
    [
      { term: 'realloc', def: '调整已申请内存大小，内容保留但可能搬家——必须用返回值更新指针。' },
      { term: '内存泄漏', def: '丢失堆内存指针且没 free：内存永远回不去，长命程序的大敌。' },
      { term: '临时变量接 realloc', def: 'int *tmp = realloc(p, ...); if (tmp) p = tmp;——防止失败时弄丢原指针。' },
    ],
    [
      { term: 'double free', def: '同一内存释放两次：未定义行为。对策：明确所有权 + free 后立刻置 NULL。' },
      { term: 'use after free', def: '释放后继续使用那块内存：内容"看起来还在"是假象，随时被覆盖。' },
      { term: 'AddressSanitizer', def: 'gcc -fsanitize=address 编译即得内存检查器，越界/泄漏/重复释放直接报出。' },
    ],
  ],
  'c-ch11': [
    [
      { term: '冒泡 / 选择 / 插入', def: '三大 O(n²) 入门排序：交换沉底 / 选最小放前 / 理牌插入。' },
      { term: '稳定性', def: '相等元素排序后相对顺序不变叫稳定。冒泡、插入稳定；选择、快排不稳定。' },
      { term: '几乎有序', def: '插入排序在此场景接近 O(n)，是小数据/近序数据的最优选。' },
    ],
    [
      { term: '快速排序', def: '选基准划分两半再递归的分治排序，平均 O(n log n) 的通用最快内排序。' },
      { term: 'partition 划分', def: '快排核心：把小于基准的放左边、大于的放右边，返回基准最终位置。' },
      { term: '最坏退化', def: '每次划分极不均匀时退化为 O(n²)，随机选基准可规避。' },
    ],
    [
      { term: '二分查找', def: '有序数组每次砍一半，O(log n)；前提是必须有序。' },
      { term: '防溢出 mid', def: 'left + (right - left) / 2 代替 (left + right) / 2，避免大下标相加溢出。' },
      { term: 'lower_bound', def: '找第一个 ≥ x 的位置：二分答案思想的基础变体。' },
    ],
  ],
  'c-ch12': [
    [
      { term: '基例与递推', def: '递归两要素：最简单情形直接给答案（基例），其余缩小问题再调自己（递推）。' },
      { term: '栈帧', def: '每次函数调用在栈上占一块空间；递归过深会栈溢出（stack overflow）。' },
      { term: '信任原则', def: '写递归时相信子调用能解决小一号问题，不在脑中逐层展开。' },
    ],
    [
      { term: '记忆化', def: '数组缓存已算结果，重复子问题直接查表：fib 从指数降到 O(n)。' },
      { term: '重复子问题', def: '朴素 fib 递归慢的根源：fib(38) 被重复计算几千万次。' },
      { term: '递推填表', def: '自底向上的动态规划：循环代替递归，省栈且顺序可控。' },
    ],
    [
      { term: '分治', def: '分解→解决→合并三步走：快排、归并、二分、汉诺塔都是分治。' },
      { term: '汉诺塔递归', def: 'n-1 个移走、最大盘到位、n-1 个移回：三行解决 2ⁿ-1 步问题。' },
      { term: '回溯法', def: '"走到底不行就退回换路"的搜索框架：全排列、八皇后、数独通用。' },
    ],
  ],
  'c-ch13': [
    [
      { term: '栈的数组实现', def: '数组 + top 指针：push 是 arr[top++]=x，pop 是 arr[--top]。' },
      { term: '上溢与下溢', def: '栈满还 push（越界写）/ 栈空还 pop（读垃圾）——两个都必须拦。' },
      { term: 'top 约定', def: 'top 指栈顶还是栈顶+1，全篇必须统一，混用必出 off-by-one。' },
    ],
    [
      { term: '循环队列', def: '下标取模绕圈：(rear+1)%MAXN，让数组空间循环利用。' },
      { term: '牺牲一格判满', def: '(rear+1)%MAXN==front 判满、front==rear 判空——否则空满撞车。' },
      { term: 'FIFO 应用', def: '任务队列、消息缓冲、BFS 层序遍历都是队列的舞台。' },
    ],
    [
      { term: '后缀表达式', def: '逆波兰式：3 4 + 表示 3+4，无需括号优先级，栈求值最方便。' },
      { term: '栈求值算法', def: '数字入栈；遇运算符弹出两数（先弹的是右操作数）计算后压回。' },
      { term: '调度场算法', def: '中缀转后缀的标准算法（也用栈），编译器处理表达式的方式。' },
    ],
  ],
  'c-ch14': [
    [
      { term: '头结点', def: '数据域不用的哨兵节点：消除"第一个元素"的所有特判，代码统一干净。' },
      { term: '插入两句顺序', def: 'new->next = prev->next 必须先做，prev->next = new 后做——反了链就断。' },
      { term: '删除两句顺序', def: 'prev->next = target->next 先绕过，free(target) 后释放。' },
    ],
    [
      { term: '迭代反转', def: 'prev/cur/nxt 三指针接力：每轮 cur->next = prev，齐步前进。' },
      { term: '快慢指针', def: '快两步慢一步：判环（必相遇）、找中点（快到尾慢在中点）。' },
      { term: '画图习惯', def: '指针操作前先在纸上画箭头图——链表不翻车的唯一秘诀。' },
    ],
    [
      { term: '双向链表', def: '节点带 prev+next 双指针：可反向遍历、O(1) 删已知节点，维护成本翻倍。' },
      { term: '循环链表', def: '尾节点 next 指回头部成环，约瑟夫问题的天然模型。' },
      { term: '约瑟夫问题', def: 'n 人围圈报数到 m 出局求幸存者：循环链表逐个删除的模拟题。' },
    ],
  ],
  'c-ch15': [
    [
      { term: '数据模型', def: '先定结构体和存储结构（数组+计数），功能围绕数据设计而非反过来。' },
      { term: '文本存档格式', def: '每行一条记录"学号 姓名 成绩"，fprintf/fscanf 直接读写，简单可靠。' },
      { term: '分层设计', def: '数据层（文件）/逻辑层（功能函数）/界面层（菜单）单向依赖，可独立替换。' },
    ],
    [
      { term: '线性查找复用', def: 'findById 返回下标或 -1，删除、修改、查询都建立在它之上。' },
      { term: '前移删除', def: '数组删元素：后面的整体前移一格、计数减一，无空洞。' },
      { term: 'qsort 比较函数', def: '返回负/零/正表示小于/等于/大于；浮点比较用 (d>0)-(d<0) 防截断。' },
    ],
    [
      { term: 'scanf 返回值检查', def: '返回成功读到的项数；输入字母返回 0 且残留缓冲区，必须清理。' },
      { term: '清空缓冲区', def: 'while (getchar() != \'\\n\'); 吃掉残留输入，防菜单死循环。' },
      { term: '无感持久化', def: '启动自动 load、退出自动 save——用户完全不用操心数据保存。' },
    ],
  ],
  'html-ch9': [
    [
      { term: 'transition', def: '属性变化时的平滑过渡：transition: all 0.3s ease，配合 hover 或切类名触发。' },
      { term: '缓动曲线', def: 'ease/linear/ease-in-out/cubic-bezier：控制动画"先快后慢"的节奏感。' },
      { term: 'GPU 加速属性', def: 'transform 和 opacity 由合成层处理不触发重排，动画只对它俩做最流畅。' },
    ],
    [
      { term: '@keyframes', def: '定义动画关键帧：from/to 或百分比节点，浏览器自动补间。' },
      { term: 'animation 简写', def: '名字 时长 曲线 次数：infinite 无限、alternate 往返。' },
      { term: '补间动画', def: '只给首尾姿势、中间自动生成的动画方式，CSS 动画的本质。' },
    ],
    [
      { term: 'transform', def: '平移/缩放/旋转/斜切四变换，不影响文档流，做位移效果的首选。' },
      { term: 'transform-origin', def: '变换中心点：默认正中，scale 从角落展开就写 0 0。' },
      { term: '重排与重绘', def: '改几何属性（width/top）触发重排很贵；transform 跳过布局直接合成。' },
    ],
  ],
  'html-ch10': [
    [
      { term: 'CSS 变量', def: '--name: 值 定义、var(--name) 使用；改一处全站变，主题系统的基石。' },
      { term: ':root', def: '文档根元素选择器，全局 CSS 变量都定义在它上面。' },
      { term: 'var() 回退值', def: 'var(--x, 默认值)：变量未定义时用默认值兜底。' },
    ],
    [
      { term: 'calc()', def: '混合单位计算：calc(100% - 200px)，加减号两侧必须有空格。' },
      { term: 'clamp()', def: 'clamp(最小, 首选, 最大)：流式尺寸不出界，响应式字号的标准写法。' },
      { term: 'vw / vh', def: '视口宽/高的 1%：随窗口缩放的相对单位。' },
    ],
    [
      { term: 'prefers-color-scheme', def: '感知系统明暗主题的媒体查询，深色模式自动切换靠它。' },
      { term: ':has()', def: '父级选择器：form:has(:invalid) 表单含非法输入时选中表单本身。' },
      { term: ':focus-visible', def: '仅键盘导航时显示焦点框，兼顾无障碍与鼠标用户观感。' },
    ],
  ],
  'html-ch11': [
    [
      { term: 'map / filter', def: '数组变形（每个元素过函数）/ 筛选（留条件为真者），都返回新数组。' },
      { term: 'reduce', def: '万能聚合：(累加器, 当前值) => 新值，把数组折叠成一个结果。' },
      { term: '不可变更新', def: '不改原数据而返回新数据的操作风格，链式调用与状态管理的基石。' },
    ],
    [
      { term: '解构赋值', def: 'const { name, age } = obj 一次性取属性；数组用 [a, b] 形式。' },
      { term: '展开运算符 ...', def: '{...obj, x: 1} 复制并覆盖、[...arr, 4] 复制并追加。' },
      { term: 'Object.entries', def: '对象转 [键, 值] 数组，配合解构遍历对象最顺手。' },
    ],
    [
      { term: '模板字符串', def: '反引号包裹、${} 嵌表达式、可换行——拼接 HTML 的神器。' },
      { term: '可选链 ?.', def: 'user?.address?.city：任一环为空就短路返回 undefined，告别连环判空。' },
      { term: '空值合并 ??', def: '只在 null/undefined 时用默认值；0 和 "" 是合法值（与 || 的关键区别）。' },
    ],
  ],
  'html-ch12': [
    [
      { term: '异步', def: '发起耗时任务后不傻等，结果好了再回调——页面不冻结的根本机制。' },
      { term: '事件循环', def: 'JS 引擎反复检查任务队列并执行完成任务的回调，异步的底层发动机。' },
      { term: '回调地狱', def: '多层异步嵌套成金字塔代码，Promise 正是为终结它而生。' },
    ],
    [
      { term: 'Promise', def: '"未来结果的凭证"：pending → fulfilled/rejected，状态落定不可逆。' },
      { term: 'then / catch / finally', def: '成功回调 / 错误兜底 / 无论如何都执行，链式调用取代嵌套。' },
      { term: 'fetch', def: '浏览器内置的网络请求 API，返回 Promise，配 .then(r=>r.json()) 解析。' },
    ],
    [
      { term: 'async / await', def: '把异步写成同步模样的语法糖：await 等结果但不卡页面，只能在 async 函数里用。' },
      { term: 'try/catch 包 await', def: 'async 函数里用同步式 try/catch 兜住异步错误，比 .catch 链直观。' },
      { term: 'Promise.all 并行', def: '多个请求先同时发出再统一等待，总耗时取最长而非求和。' },
    ],
  ],
  'html-ch13': [
    [
      { term: 'submit 事件', def: '表单提交时触发；e.preventDefault() 阻止跳转，JS 接管的第一步。' },
      { term: 'FormData', def: 'new FormData(form) 收集所有带 name 的控件值，配 fetch 直接提交。' },
      { term: '事件委托', def: '监听绑在父级、靠 e.target 识别来源——一个监听器管全部输入框。' },
    ],
    [
      { term: 'input 事件', def: '每次键入立即触发，做"边输边验"；blur 失焦触发，做"输完再验"。' },
      { term: 'checkValidity()', def: '查询表单/控件是否通过 HTML5 内置验证（required、type 等）。' },
      { term: 'setCustomValidity', def: '设置自定义错误消息，让浏览器自带气泡显示你的规则。' },
    ],
    [
      { term: '防重复提交', def: '提交中 disabled 按钮 + 显示"提交中"，响应回来再恢复。' },
      { term: 'JSON 提交', def: 'fetch POST 三件套：method、Content-Type 头、JSON.stringify 的 body。' },
      { term: '前端验证边界', def: '前端验证只做体验优化，可被绕过；安全校验必须在后端重做。' },
    ],
  ],
  'html-ch14': [
    [
      { term: 'localStorage', def: '浏览器持久键值仓库：关机也在、同域共享、约 5MB，只存字符串。' },
      { term: 'JSON 序列化配套', def: '存对象 setItem 前 stringify、取后 parse——否则得到 "[object Object]"。' },
      { term: '同源策略', def: '存储按域名隔离：a.com 读不到 b.com 的数据，浏览器安全基石。' },
    ],
    [
      { term: 'sessionStorage', def: '用法同 localStorage，但限当前标签页，关页即清。' },
      { term: 'Cookie', def: '4KB 小容量、随请求自动带往服务器、可设过期——登录态标识的专用通道。' },
      { term: '存储选型', def: '长期偏好 localStorage、会话暂存 sessionStorage、服务器要读用 Cookie。' },
    ],
    [
      { term: 'location', def: '地址栏对象：href 读跳网址、reload 刷新、search 拿查询串。' },
      { term: 'history.pushState', def: '无刷新改地址并入历史——SPA 前端路由的基石。' },
      { term: 'navigator', def: '浏览器信息对象：userAgent 设备、onLine 联网、clipboard 剪贴板。' },
    ],
  ],
  'html-ch15': [
    [
      { term: '数据驱动', def: 'JS 数据是唯一真相源，界面由 render() 按数据统一重绘，不手改 DOM。' },
      { term: 'render 函数', def: '"把数据画出来"的函数：任何操作只改数据再调 render，思路永不乱。' },
      { term: '唯一 id', def: 'Date.now() 时间戳当 id，让每条待办可被精确定位。' },
    ],
    [
      { term: '事件委托', def: '动态元素绑不了事件？监听绑父级 ul，e.target 判断点的是谁。' },
      { term: 'closest("li")', def: '从点击目标向上找最近的 li 祖先，拿到 data-id 定位数据。' },
      { term: 'filter 删除', def: 'todos.filter(t => t.id !== id) 生成不含目标的新数组——不可变删除。' },
    ],
    [
      { term: '渲染时过滤', def: '筛选不改数据：render 时按状态过滤后再渲染，三态切换零成本。' },
      { term: '完成态样式', def: '.done 类名控制删除线+半透明，配 transition 有划线动画。' },
      { term: '空态提示', def: '列表为空时显示引导文案，细节体验的分水岭。' },
    ],
  ],
}
