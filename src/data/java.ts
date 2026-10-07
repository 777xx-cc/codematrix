import type { LanguagePack } from './types'

export const java: LanguagePack = {
  id: 'java',
  name: 'Java',
  zhName: 'Java',
  color: '#f89820',
  gradient: 'from-amber-500 to-orange-600',
  icon: '☕',
  tagline: '一次编写，到处运行',
  description: '面向对象、跨平台的企业级开发语言，广泛用于后端服务、Android 与大数据生态。',
  playgroundTemplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeMatrix!");
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("1+2+...+100 = " + sum);
    }
}`,
  chapters: [
    {
      id: 'java-ch1',
      title: '第 1 章 Java 入门与开发环境',
      intro: '认识 Java 的历史、特性、运行机制，并搭建第一个开发环境。',
      sections: [
        {
          title: '1.1 Java 是什么',
          content: [
            'Java 于 1995 年由 Sun 公司发布（2009 年随 Sun 被 Oracle 收购），是一种面向对象、跨平台的高级编程语言。其最著名的口号是 Write Once, Run Anywhere（一次编写，到处运行）。',
            'Java 源码（.java）先由编译器 javac 编译成字节码（.class），再由 JVM（Java 虚拟机）解释执行。正因为字节码与平台无关，任何装有 JVM 的系统都能运行同一份程序。这种"编译 + 解释"的混合模式使 Java 兼具可移植性与不错的性能。',
            'Java 的三大体系：Java SE（标准版，基础语法与核心类库）、Java EE（企业版，Web 与分布式）、Java ME（移动嵌入式版）。学习必须从 Java SE 起步。',
            'Java 的主要特性：面向对象（一切皆类）、自动垃圾回收（GC，无需手动释放内存）、强类型检查、丰富的标准类库、多线程支持、安全性（运行在 JVM 沙箱中）。',
          ],
          code: {
            lang: 'java',
            caption: '第一个 Java 程序',
            source: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
          },
        },
        {
          title: '1.2 JDK、JRE 与 JVM 的关系',
          content: [
            'JVM（Java Virtual Machine）是运行字节码的虚拟机；JRE（Java Runtime Environment）= JVM + 核心类库，是运行 Java 程序的最小环境；JDK（Java Development Kit）= JRE + 编译器 javac 等开发工具。',
            '记忆口诀：JDK 包含 JRE，JRE 包含 JVM。开发者安装 JDK，普通用户只需 JRE。这是笔试选择题的常驻考点。',
            '编译运行流程：javac HelloWorld.java 生成 HelloWorld.class → java HelloWorld 启动 JVM 执行（注意运行时不加 .class 后缀）。',
            '环境变量配置：JAVA_HOME 指向 JDK 安装目录，PATH 中添加 %JAVA_HOME%\\bin，使命令行任意位置都能使用 javac 与 java 命令。验证安装：java -version。',
          ],
        },
        {
          title: '1.3 main 方法详解',
          content: [
            'main 方法是程序入口，签名必须严格写作 public static void main(String[] args)。public 保证 JVM 可访问；static 使 JVM 无需创建对象即可调用；void 表示无返回值；String[] args 接收命令行参数。',
            '一个 .java 文件最多只能有一个 public 类，且 public 类名必须与文件名完全一致，这是编译器的硬性规定，也是考试高频考点。非 public 类可以有多个。',
            '注释三种形式：// 单行注释、/* 多行注释 */、/** 文档注释 */（可被 javadoc 工具提取生成 API 文档）。注释不会被编译，是写给人看的。',
            '常见编译错误速查：类名与文件名不一致、main 拼成 mian、语句末尾漏分号、使用了中文标点。初学者 80% 的报错来自这四类。',
          ],
        },
      ],
      quiz: [
        {
          question: 'Java 程序的正确执行流程是？',
          options: ['A. 源码 → 直接运行', 'B. 源码 → 字节码 → JVM 执行', 'C. 源码 → 机器码 → 执行', 'D. 字节码 → 源码 → 执行'],
          answer: 'B',
          explanation: 'javac 先把 .java 编译成平台无关的 .class 字节码，再由 JVM 解释执行，这是跨平台的根基。',
        },
        {
          question: 'JDK、JRE、JVM 三者的包含关系是 ______。',
          answer: 'JDK ⊃ JRE ⊃ JVM（JDK 包含 JRE，JRE 包含 JVM）',
          explanation: 'JDK = JRE + 开发工具（javac 等）；JRE = JVM + 核心类库。',
        },
        {
          question: '一个名为 Demo.java 的源文件中，public 类的名称必须是？',
          options: ['A. 任意名称', 'B. Demo', 'C. main', 'D. 可以有多个 public 类'],
          answer: 'B',
          explanation: 'public 类名必须与文件名一致，且一个文件至多一个 public 类。',
        },
      ],
    },
    {
      id: 'java-ch2',
      title: '第 2 章 基本语法与数据类型',
      intro: '变量、常量、八大基本类型、运算符与类型转换。',
      sections: [
        {
          title: '2.1 八大基本数据类型',
          content: [
            '整型四种：byte（1 字节，-128~127）、short（2 字节）、int（4 字节，默认）、long（8 字节，字面量需加 L 后缀）。',
            '浮点两种：float（4 字节，字面量需加 f）、double（8 字节，默认）。字符型 char 占 2 字节，采用 Unicode 编码，可存汉字。布尔型 boolean 只有 true / false，不能与整数互相转换（与 C 语言不同，高频考点）。',
            '字面量直接赋值时，int 常量可以赋给 byte/short/char（只要不超范围），编译器会自动窄化。例如 byte b = 100; 合法，byte b = 200; 报错。',
            '引用类型与基本类型的区别：基本类型存值本身，引用类型（类、接口、数组、字符串）存对象地址。String 是最常用的引用类型，注意它不属于八大基本类型。',
            '数值字面量增强可读性：1_000_000 下划线分隔（JDK7+）；二进制 0b1010、八进制 012、十六进制 0xFF。',
          ],
          code: {
            lang: 'java',
            source: `byte b = 100;          // 合法：100 在 byte 范围内
long big = 10000000000L;  // 必须加 L
float f = 3.14f;       // 必须加 f
char c = '中';          // char 可存汉字
boolean flag = true;   // 只能是 true/false
int million = 1_000_000; // 下划线仅用于可读性`,
          },
        },
        {
          title: '2.2 类型转换：自动与强制',
          content: [
            '自动类型转换（widening）：小容量 → 大容量，如 byte → short → int → long → float → double，char → int。注意 long（8 字节整数）→ float（4 字节浮点）也是自动转换，因为浮点表示范围更大。',
            '强制类型转换（narrowing）：大容量 → 小容量，需显式书写 (类型)，可能丢失精度或溢出。例如 (int)3.99 结果为 3，直接截断小数而非四舍五入。',
            '表达式提升规则：byte/short/char 参与运算时先自动提升为 int，因此 byte b = 1; b = b + 1; 编译报错，必须写成 b = (byte)(b + 1); 或 b += 1;（复合赋值运算符自带强转）。',
            '溢出经典题：byte b = (byte)130; 结果是 -126。因为 130 超出 byte 范围，按补码回绕：130 - 256 = -126。',
          ],
        },
        {
          title: '2.3 运算符与优先级',
          content: [
            '算术运算符 + - * / %：整数除法截断小数，7 / 2 = 3；取余结果符号与被除数一致，-7 % 3 = -1。',
            '自增自减：i++ 先用后加，++i 先加后用。经典考题 int i = 1; i = i++; 结果 i 仍为 1，因为 i++ 的值是旧值，赋值又把它覆盖回去。',
            '逻辑运算符 && || 有短路特性：左边能确定结果时右边不再执行。& | 不短路。位运算符 << >> >>> 分别表示左移、带符号右移、无符号右移；左移 n 位相当于乘 2 的 n 次方。',
            '三目运算符 条件 ? 值1 : 值2 是唯一的三元运算符，两个值类型不同时会自动提升。',
            '优先级速记：括号 > 单目（!、++、--）> 算术 > 移位 > 关系 > 相等（== !=）> 位与逻辑 > 三目 > 赋值。拿不准就加括号。',
          ],
        },
        {
          title: '2.4 常量、变量作用域与命名规范',
          content: [
            '常量用 final 修饰：final double PI = 3.14159; 赋值后不可更改，再次赋值编译报错。常量名按规范全大写下划线分隔。',
            '变量作用域：从声明处到所在代码块结束。for 循环内声明的变量循环外不可用；同名变量不能在嵌套作用域重复声明（与 Python 不同）。',
            '命名规范（阿里规约）：类名大驼峰 HelloWorld，变量/方法小驼峰 helloWorld，常量全大写 MAX_SIZE，包名全小写。标识符只能由字母、数字、_、$ 组成，不能以数字开头，不能使用关键字。',
          ],
        },
      ],
      quiz: [
        {
          question: '下列赋值语句中，编译报错的是？',
          options: ['A. byte b = 127;', 'B. long l = 100;', 'C. float f = 3.14;', 'D. char c = 97;'],
          answer: 'C',
          explanation: '3.14 默认是 double，大转小需要强转或加 f 后缀。D 合法：int 常量 97 在 char 范围内，对应字符 a。',
        },
        {
          question: '表达式 7 / 2 与 7 % 2 的结果分别是 ______ 与 ______。',
          answer: '3；1',
          explanation: '整数除法截断小数得 3；取余得 1。',
        },
        {
          question: 'int i = 1; i = i++; 执行后 i 的值为？',
          options: ['A. 1', 'B. 2', 'C. 编译错误', 'D. 0'],
          answer: 'A',
          explanation: 'i++ 的值是旧值 1，赋回给 i 后 i 仍为 1——最经典的自增陷阱题。',
        },
        {
          question: 'byte b = 1; 下列语句能编译通过的是？',
          options: ['A. b = b + 1;', 'B. b += 1;', 'C. b = b * 2;', 'D. b = b + 1000;'],
          answer: 'B',
          explanation: '复合赋值运算符自带强制转换；b + 1 提升为 int，直接赋回 byte 报错。',
        },
      ],
    },
    {
      id: 'java-ch3',
      title: '第 3 章 流程控制',
      intro: '分支与循环：if、switch、for、while、break、continue。',
      sections: [
        {
          title: '3.1 if 与 switch',
          content: [
            'if 的条件必须是 boolean 表达式，不能写 if (a = 1) 这种赋值（C 语言可以，Java 编译直接报错）——这是 Java 对 C 经典陷阱的修正。',
            'if-else if-else 多分支从上往下匹配，命中即执行并跳出整体；else 与最近的未配对 if 配对（悬垂 else 问题），务必用 {} 明确归属。',
            'switch 支持 byte、short、char、int、String（JDK7+）、枚举。case 后必须是常量表达式，且不要忘记 break，否则会发生"穿透"——继续执行后续 case 代码块。',
            'JDK14 引入箭头 switch：case 1 -> ... 天然无穿透，还可以用 yield 返回值，并能直接作为表达式赋值。',
          ],
          code: {
            lang: 'java',
            source: `int day = 3;
switch (day) {
    case 1: System.out.println("周一"); break;
    case 2: System.out.println("周二"); break;
    case 3: System.out.println("周三"); break; // 输出"周三"
    default: System.out.println("其他");
}`,
          },
        },
        {
          title: '3.2 循环结构',
          content: [
            'for (初始化; 条件; 更新) 适合次数确定的循环；while 先判断后执行，可能一次都不执行；do-while 先执行后判断，至少执行一次——三者区别在于判断时机。',
            '增强 for（for-each）：for (int x : arr) 遍历数组/集合，语法简洁但拿不到下标，也不能在遍历中修改元素位置。',
            'break 跳出整个循环；continue 跳过本次进入下一次。带标签的 break outer; 可以跳出多层嵌套循环，是 Java 中少见的合法"跳转"。',
            '死循环写法：for(;;) 或 while(true)。循环条件写反（如 i >= 0 无上限递增）是新手最常见的死循环来源。',
          ],
        },
        {
          title: '3.3 经典循环算法',
          content: [
            '累加累乘、水仙花数、素数判断、九九乘法表、斐波那契数列是循环章节五大必练题型。',
            '判断素数只需试除到 √n，找到因子立即 break 并设置标志位，是效率与规范兼顾的标准写法。',
            '斐波那契迭代模板：int a = 0, b = 1; 循环中 int t = a + b; a = b; b = t; 滚动更新，避免递归的指数级重复计算。',
          ],
          code: {
            lang: 'java',
            caption: '判断素数',
            source: `int n = 97;
boolean isPrime = true;
for (int i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) { isPrime = false; break; }
}
System.out.println(n + (isPrime ? " 是素数" : " 不是素数"));`,
          },
        },
        {
          title: '3.4 嵌套循环与图形打印',
          content: [
            '打印图形题的统一思路：外层控制行，内层控制列，列的数量/内容用行号 i 的表达式描述。先写出行号与空格数、星号数的对应表，再翻译成代码。',
            '直角三角形：第 i 行打印 i 个星号；等腰三角形：第 i 行打印 n-i 个空格和 2i-1 个星号。',
            '嵌套循环的性能意识：双重循环是 O(n²)，处理 10 万级数据就会明显变慢，算法题中要注意内层能否提前 break。',
          ],
          code: {
            lang: 'java',
            caption: '打印 4 行直角三角形',
            source: `for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("*");
    }
    System.out.println(); // 换行
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'switch 语句中缺少 break 会导致什么现象？',
          answer: '穿透：匹配到某个 case 后，会继续顺序执行后续所有 case/default 的代码，直到遇到 break 或 switch 结束',
          explanation: '穿透有时被有意利用（多个 case 共享逻辑），但绝大多数情况是 bug。',
        },
        {
          question: '下列循环中，循环体至少执行一次的是？',
          options: ['A. for', 'B. while', 'C. do-while', 'D. 都一样'],
          answer: 'C',
          explanation: 'do-while 先执行后判断，无论条件真假都至少执行一次。',
        },
        {
          question: 'for (int i = 0; i < 5; i += 2) 的循环体执行次数为？',
          options: ['A. 2', 'B. 3', 'C. 5', 'D. 无限'],
          answer: 'B',
          explanation: 'i 依次取 0、2、4，第三次后 i=6 不满足 i<5，共执行 3 次。',
        },
        {
          question: '要跳出两层嵌套循环，可以使用 ______。',
          answer: '带标签的 break（如 outer: 标记外层循环，break outer;）',
          explanation: '普通 break 只跳出最近一层；标签 break 可直接终止外层循环。',
        },
      ],
    },
    {
      id: 'java-ch4',
      title: '第 4 章 数组与字符串',
      intro: '一维/二维数组、Arrays 工具类、String 的不可变性与常用 API。',
      sections: [
        {
          title: '4.1 数组基础',
          content: [
            '数组是引用类型，创建后长度固定。声明初始化三式：int[] a = {1,2,3}; / int[] a = new int[]{1,2,3}; / int[] a = new int[5];（默认全 0）。',
            '数组元素默认值：数值型 0、boolean false、引用类型 null。访问越界抛出 ArrayIndexOutOfBoundsException，属于运行时异常。',
            'length 是数组的属性（不是方法），遍历边界应写 i < a.length。数组一旦创建长度不可改变，需要"扩容"时只能新建数组再拷贝（Arrays.copyOf 或 ArrayList）。',
            '数组的内存模型：int[] a = new int[3] 中，变量 a 在栈中存地址，3 个 int 在堆中连续分配。两个数组变量赋值 a = b 后指向同一数组，改一个影响另一个。',
          ],
        },
        {
          title: '4.2 二维数组与常见算法',
          content: [
            '二维数组 int[][] m = new int[3][4]; 本质是数组的数组，每一行长度可以不同（不规则数组）：int[][] m = new int[3][]; m[0] = new int[2];',
            '遍历二维数组用双重循环：外层行 m.length，内层列 m[i].length。',
            '必会算法：选择排序、冒泡排序、二分查找（前提：数组有序）、数组逆置、找最大值及其下标。',
          ],
          code: {
            lang: 'java',
            caption: '冒泡排序',
            source: `int[] a = {5, 2, 8, 1, 9};
for (int i = 0; i < a.length - 1; i++) {
    for (int j = 0; j < a.length - 1 - i; j++) {
        if (a[j] > a[j + 1]) {
            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        }
    }
} // 结果：1 2 5 8 9`,
          },
        },
        {
          title: '4.3 String 不可变性与常量池',
          content: [
            'String 对象不可变，所有"修改"方法（concat、replace、toUpperCase 等）都返回新对象。频繁拼接应使用 StringBuilder（非线程安全、快）或 StringBuffer（线程安全）。',
            '常量池考点：String s1 = "abc"; String s2 = "abc"; s1 == s2 为 true（指向同一常量）；但 new String("abc") 一定创建新对象，== 为 false。比较内容永远用 equals()。',
            '高频 API：length()、charAt()、indexOf()、substring()、split()、trim()、equalsIgnoreCase()。注意 String 的 length() 是方法，数组的 length 是属性——经典混淆考点。',
            'substring(begin, end) 左闭右开："hello".substring(1, 4) 得 "ell"。charAt 越界抛 StringIndexOutOfBoundsException。',
          ],
        },
        {
          title: '4.4 Arrays 工具类与字符串转换',
          content: [
            'Arrays 常用静态方法：Arrays.sort(a) 排序、Arrays.toString(a) 转 "[1, 2, 3]" 字符串方便打印、Arrays.copyOf(a, n) 拷贝扩容、Arrays.binarySearch(a, key) 二分查找、Arrays.equals(a, b) 内容比较。',
            'String 与字符数组互转：s.toCharArray() 得 char[]；new String(chars) 还原。与数字互转：Integer.parseInt("123")、String.valueOf(123)。',
            '直接 System.out.println(数组) 输出的是形如 [I@1b6d3586 的地址信息，必须用 Arrays.toString()——每个初学者都踩过这个坑。',
          ],
        },
      ],
      quiz: [
        {
          question: 'int[] a = new int[5]; 执行后 a[4] 的值是？',
          options: ['A. null', 'B. 0', 'C. 随机值', 'D. 编译错误'],
          answer: 'B',
          explanation: '数组是引用类型，创建后元素自动初始化为默认值，int 型默认 0。',
        },
        {
          question: 'String s1 = "abc"; String s2 = new String("abc"); s1 == s2 的结果是 ______，s1.equals(s2) 的结果是 ______。',
          answer: 'false；true',
          explanation: 'new 一定在堆中创建新对象，== 比地址为 false；equals 比内容为 true。',
        },
        {
          question: '下列能正确打印数组内容的是？',
          options: ['A. System.out.println(arr);', 'B. System.out.println(arr.toString());', 'C. System.out.println(Arrays.toString(arr));', 'D. 以上都可以'],
          answer: 'C',
          explanation: '数组继承 Object 的 toString 输出地址，必须用 Arrays.toString()。',
        },
        {
          question: '二维数组 int[][] m = new int[3][]; 下列说法正确的是？',
          options: ['A. 每行长度必须为 3', 'B. m[0] 为 null，需单独初始化', 'C. 编译错误', 'D. m 共有 9 个元素'],
          answer: 'B',
          explanation: '只指定行数时，每行是 null 引用，需要 m[i] = new int[n] 单独分配，各行长度可以不同。',
        },
      ],
    },
    {
      id: 'java-ch5',
      title: '第 5 章 面向对象（上）：类与对象',
      intro: '类、对象、构造方法、this、static、封装与访问修饰符。',
      sections: [
        {
          title: '5.1 类与对象',
          content: [
            '类是模板，对象是实例。通过 new 关键字创建对象，对象保存在堆内存，变量保存的是引用（地址）。Student s = new Student(); s 只是遥控器，电视机本体在堆里。',
            '成员变量有默认值（0/null/false），局部变量没有默认值，必须先赋值再使用，否则编译报错——这是笔试辨析题的常客。',
            '方法重载（Overload）：同一类中方法名相同、参数列表不同（个数、类型、顺序），与返回值无关。仅返回值不同不构成重载，编译报错。',
            '参数传递：Java 只有值传递！基本类型传值副本；引用类型传地址副本——因此方法内可以修改对象内容，但不能让原引用指向新对象。',
          ],
        },
        {
          title: '5.2 构造方法与 this',
          content: [
            '构造方法名与类名相同，没有返回值类型（连 void 都不能写）。如果不定义任何构造方法，编译器赠送一个无参构造；一旦自定义了构造方法，默认构造不再赠送。',
            'this 代表当前对象：this.属性 区分同名局部变量；this(参数) 在构造方法中调用本类其他构造，且必须写在第一行。',
            '构造方法的执行时机：new 的时候。创建对象三部曲：分配内存 → 成员变量默认初始化 → 执行构造方法体。',
          ],
          code: {
            lang: 'java',
            source: `class Student {
    String name;
    int age;
    Student(String name, int age) {
        this.name = name;  // this 区分成员与参数
        this.age = age;
    }
    void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁");
    }
}`,
          },
        },
        {
          title: '5.3 static 与封装',
          content: [
            'static 成员属于类而非对象，被所有实例共享，通过 类名.成员 访问。static 方法中不能直接访问非静态成员（因为没有 this），也不能使用 this/super。',
            'static 代码块在类加载时执行一次，先于构造方法，常用于初始化静态资源。执行顺序：静态代码块 → 构造代码块 → 构造方法。',
            '封装四步：属性私有化 private → 提供 public 的 getter/setter → 在 setter 中做合法性校验。访问修饰符范围：private < 默认(包) < protected < public。',
            '封装的收益：隐藏实现细节，外部只能通过受控接口访问，校验逻辑集中在 setter，避免对象被置于非法状态（如年龄被赋负数）。',
          ],
        },
        {
          title: '5.4 包与垃圾回收',
          content: [
            '包（package）用于组织类、避免命名冲突：package com.demo; 必须写在源文件第一行；import 引入其他包的类，java.lang 包（String 等）自动导入无需书写。',
            'JDK 常用包：java.util（集合/工具）、java.io（输入输出）、java.time（日期时间）、java.math（BigDecimal 精确计算）。',
            '垃圾回收（GC）自动回收不再被引用的对象。对象"死亡"的判据是没有任何引用指向它；可以把引用置 null 加速这一过程，但不能强制回收（System.gc() 只是建议）。',
          ],
        },
      ],
      quiz: [
        {
          question: '关于构造方法，下列说法错误的是？',
          options: ['A. 方法名与类名相同', 'B. 可以声明返回值为 void', 'C. 可以重载', 'D. 自定义后默认无参构造不再赠送'],
          answer: 'B',
          explanation: '构造方法没有返回值类型，写 void 就变成了普通方法。',
        },
        {
          question: 'static 方法中不能直接使用 ______ 关键字。',
          answer: 'this（也不能用 super）',
          explanation: 'static 方法属于类，执行时不存在"当前对象"，因此没有 this。',
        },
        {
          question: '下列关于 Java 参数传递的说法正确的是？',
          options: ['A. 引用类型是引用传递', 'B. 基本类型是引用传递', 'C. 全都是值传递', 'D. 取决于方法修饰符'],
          answer: 'C',
          explanation: 'Java 只有值传递：引用类型传递的是地址值的副本，所以能改对象内容但换不了引用指向。',
        },
        {
          question: '封装的标准做法是属性用 ______ 修饰，并提供 public 的 getter/setter。',
          answer: 'private',
          explanation: 'private 隐藏属性，getter/setter 提供受控访问并可在 setter 中校验。',
        },
      ],
    },
    {
      id: 'java-ch6',
      title: '第 6 章 面向对象（下）：继承、多态与接口',
      intro: 'extends、super、方法重写、多态、抽象类与接口。',
      sections: [
        {
          title: '6.1 继承',
          content: [
            'Java 只支持单继承（一个类只能 extends 一个父类），但支持多层继承。子类继承父类的非 private 成员。所有类默认继承 Object（toString、equals、hashCode 都来自它）。',
            'super 指代父类：super.成员 访问父类成员；super(参数) 调用父类构造，必须在子类构造的第一行。如果父类没有无参构造，子类构造必须显式调用 super(...)。',
            '方法重写（Override）：子类方法与父类方法签名完全相同，访问权限不能更严格，返回值可以是其子类（协变返回）。用 @Override 注解让编译器帮忙检查。',
            '重写与重载的区别：重写发生在父子类之间（运行期多态），重载发生在同一个类内（编译期确定）——"两同一小一大"：方法名相同、参数相同，返回值小于等于，异常小于等于，权限大于等于。',
          ],
        },
        {
          title: '6.2 多态',
          content: [
            '多态三要素：继承、重写、父类引用指向子类对象（Animal a = new Dog();）。',
            '运行规则：编译看左边（父类必须有该方法），运行看右边（实际执行子类重写后的方法）；成员变量没有多态，始终看左边。static 方法也没有多态。',
            '向下转型需用 instanceof 判断，否则可能抛出 ClassCastException：if (a instanceof Dog d) { d.watchHouse(); }（JDK16 模式匹配写法）。',
            '多态的价值：同一行为作用于不同对象产生不同结果，是"开闭原则"的基础——新增子类无需修改调用方代码。',
          ],
        },
        {
          title: '6.3 抽象类与接口',
          content: [
            '抽象类 abstract class：可以有抽象方法（无方法体）也可以有普通方法；不能实例化；有构造方法（供子类调用）；单继承。含抽象方法的类必须是抽象类，但抽象类可以没有抽象方法。',
            '接口 interface：JDK8 前所有方法默认 public abstract，属性默认 public static final；JDK8+ 支持 default 和 static 方法，JDK9+ 支持 private 方法。一个类可以 implements 多个接口，接口之间可以多继承。',
            '选型原则：is-a 关系用抽象类（共享实现），能力/契约用接口（规范行为）。典型对比：抽象类可以有普通成员变量，接口的属性都是常量。',
          ],
          code: {
            lang: 'java',
            source: `interface Flyable { void fly(); }
abstract class Animal { abstract void eat(); }
class Bird extends Animal implements Flyable {
    public void eat() { System.out.println("吃虫子"); }
    public void fly() { System.out.println("展翅高飞"); }
}`,
          },
        },
        {
          title: '6.4 final、内部类与匿名内部类',
          content: [
            'final 三用：修饰类不可继承（如 String）；修饰方法不可重写；修饰变量成为常量（基本类型值不变，引用类型指向不变但内容可改）。',
            '匿名内部类：new 接口/抽象类() { 实现方法 } 一次性创建实现类对象，常见于事件监听与线程创建：new Thread(() -> {...}).start()。',
            'Lambda 表达式（JDK8+）是函数式接口（只有一个抽象方法的接口，如 Runnable、Comparator）的简洁写法：(a, b) -> a - b。',
          ],
        },
      ],
      quiz: [
        {
          question: 'Java 中一个类最多能直接继承 ______ 个类，可以实现 ______ 个接口。',
          answer: '1；多',
          explanation: '单继承多实现。接口弥补单继承的局限，接口之间还可以多继承。',
        },
        {
          question: 'Animal a = new Dog(); a 调用重写的方法时，实际执行的是？',
          options: ['A. 父类版本', 'B. 子类版本', 'C. 编译错误', 'D. 随机'],
          answer: 'B',
          explanation: '实例方法动态绑定：编译看左边类型有没有这个方法，运行看右边实际对象的版本。',
        },
        {
          question: '下列关于接口的说法正确的是？',
          options: ['A. 接口可以实例化', 'B. 接口中的属性默认 public static final', 'C. 接口可以有构造方法', 'D. 一个类只能实现一个接口'],
          answer: 'B',
          explanation: '接口不能实例化、没有构造方法；属性自动是常量；类可实现多个接口。',
        },
        {
          question: '向下转型前应该用 ______ 运算符判断实际类型，避免 ClassCastException。',
          answer: 'instanceof',
          explanation: 'if (a instanceof Dog) 确认后再 (Dog) a 强转，是安全转型的标准姿势。',
        },
      ],
    },
    {
      id: 'java-ch7',
      title: '第 7 章 异常处理',
      intro: '异常体系、try-catch-finally、throw 与 throws、自定义异常。',
      sections: [
        {
          title: '7.1 异常体系',
          content: [
            'Throwable 分两大分支：Error（系统级错误，如 OutOfMemoryError、StackOverflowError，程序无法处理）和 Exception。Exception 又分为编译时异常（受检，必须处理，如 IOException、SQLException）和运行时异常（RuntimeException 及其子类）。',
            '常见运行时异常要会认：NullPointerException（空指针）、ArithmeticException（除零）、ArrayIndexOutOfBoundsException（数组越界）、ClassCastException（类型转换）、NumberFormatException（数字格式）。',
            '设计哲学：受检异常强制开发者面对可恢复的错误（如文件不存在），运行时异常通常是程序 bug，应该靠改代码而不是 catch 来解决。',
          ],
        },
        {
          title: '7.2 try-catch-finally',
          content: [
            'try 中放可能出错的代码；catch 捕获并处理，可写多个 catch，子类异常必须写在父类之前；finally 无论是否异常都会执行，常用于释放资源。',
            '高频考点：finally 中有 return 会覆盖 try/catch 中的 return；System.exit(0) 是唯一能让 finally 不执行的情况。',
            'throw 主动抛出异常对象（方法体内）；throws 声明方法可能抛出的异常（方法签名上），把处理责任交给调用者。throw 是动作，throws 是声明。',
            '异常对象常用方法：e.getMessage() 简短描述；e.printStackTrace() 打印完整堆栈（调试首选）。',
          ],
          code: {
            lang: 'java',
            source: `try {
    int r = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("除数不能为 0：" + e.getMessage());
} finally {
    System.out.println("无论如何都会执行");
}`,
          },
        },
        {
          title: '7.3 自定义异常与资源管理',
          content: [
            '自定义异常：继承 Exception（受检）或 RuntimeException（非受检），提供带消息的构造方法：class AgeException extends RuntimeException { AgeException(String msg) { super(msg); } }。',
            '业务中throw 自定义异常比返回错误码更清晰：if (age < 0) throw new AgeException("年龄不能为负");',
            'try-with-resources（JDK7+）：try (FileInputStream fis = new FileInputStream("a.txt")) { ... } 自动调用 close()，资源类需实现 AutoCloseable 接口，是 finally 关流的现代替代。',
          ],
        },
      ],
      quiz: [
        {
          question: '下列异常中属于受检异常（编译时强制处理）的是？',
          options: ['A. NullPointerException', 'B. IOException', 'C. ArithmeticException', 'D. ArrayIndexOutOfBoundsException'],
          answer: 'B',
          explanation: 'IOException 是受检异常，必须 try-catch 或 throws 声明；其余都是 RuntimeException 子类。',
        },
        {
          question: '多个 catch 块的正确顺序是 ______ 在前，______ 在后。',
          answer: '子类异常；父类异常',
          explanation: '父类在前会先捕获所有子类异常，后面的子类 catch 永远不可达，编译报错。',
        },
        {
          question: '方法内用 throw 抛出一个受检异常对象后，方法签名上必须？',
          options: ['A. 什么都不用做', 'B. 用 throws 声明该异常', 'C. 加 final', 'D. 加 static'],
          answer: 'B',
          explanation: '受检异常必须被处理或声明：throw 之后要么外层 try-catch，要么方法上 throws。',
        },
      ],
    },
    {
      id: 'java-ch8',
      title: '第 8 章 集合框架',
      intro: 'List、Set、Map 三大体系与遍历方式、泛型。',
      sections: [
        {
          title: '8.1 List 与 Set',
          content: [
            'ArrayList：底层数组，查询快（按下标 O(1)），增删慢（中间插删要搬移元素）；LinkedList：底层双向链表，增删快，查询慢。Vector 线程安全但已过时，面试会问区别。',
            'HashSet 无序不可重复，去重依赖 hashCode() 和 equals()：先比 hashCode 定位桶，再用 equals 判等。自定义对象去重必须同时重写这两个方法。',
            'TreeSet 有序（自然排序 Comparable 或比较器 Comparator），LinkedHashSet 保证插入顺序。三者记忆：HashSet 快而乱、TreeSet 排序、LinkedHashSet 记序。',
            '泛型 <T> 把类型检查提前到编译期，避免强制转换。集合中只能存对象，存基本类型靠自动装箱（int → Integer）。装箱拆箱有性能开销，Integer 缓存 -128~127 是面试题常客。',
          ],
        },
        {
          title: '8.2 Map 与遍历',
          content: [
            'HashMap 以键值对存储，键唯一（重复 put 覆盖旧值），无序；LinkedHashMap 保持插入序；TreeMap 按键排序；Hashtable 线程安全、不允许 null 键值（HashMap 允许一个 null 键）。',
            '遍历方式：keySet() 遍历键再取值；entrySet() 直接拿键值对，效率最高；JDK8 的 forEach((k,v) -> ...) 配合 Lambda。',
            'ArrayList 遍历中删除元素要用 Iterator 的 remove()，否则抛出 ConcurrentModificationException（fail-fast 机制）。',
            'HashMap 底层（面试高频）：数组 + 链表 + 红黑树（JDK8），链表长度超过 8 且数组长度 ≥64 时树化。初始容量 16，负载因子 0.75，扩容翻倍。',
          ],
          code: {
            lang: 'java',
            source: `Map<String, Integer> score = new HashMap<>();
score.put("张三", 90);
score.put("李四", 85);
for (Map.Entry<String, Integer> e : score.entrySet()) {
    System.out.println(e.getKey() + " -> " + e.getValue());
}`,
          },
        },
        {
          title: '8.3 集合工具类与选型指南',
          content: [
            'Collections 工具类：sort(list) 排序（可传 Comparator）、reverse、shuffle 打乱、max/min、frequency 统计频次、binarySearch。',
            '选型速查：要按下标快速访问 ArrayList；频繁首尾增删 LinkedList/ArrayDeque；去重 HashSet；去重且保序 LinkedHashSet；键值查找 HashMap；线程安全 ConcurrentHashMap。',
            '数组与集合互转：Arrays.asList(arr) 转 List（定长，不能增删！）；list.toArray() 转数组。asList 的定长陷阱是高频考点。',
          ],
        },
      ],
      quiz: [
        {
          question: 'ArrayList 与 LinkedList 的核心区别是？',
          answer: 'ArrayList 底层是数组，随机访问快增删慢；LinkedList 底层是双向链表，增删快随机访问慢',
          explanation: '绝大多数场景用 ArrayList；只有频繁中间/首尾增删才考虑 LinkedList。',
        },
        {
          question: 'HashSet 判断元素重复依赖哪两个方法？',
          options: ['A. == 和 compareTo', 'B. hashCode 和 equals', 'C. toString 和 equals', 'D. clone 和 hashCode'],
          answer: 'B',
          explanation: '先 hashCode 定位桶，再 equals 逐个比较。自定义类必须同时重写二者。',
        },
        {
          question: '遍历 Map 效率最高的方式是？',
          options: ['A. keySet() 再 get', 'B. entrySet()', 'C. values()', 'D. toString()'],
          answer: 'B',
          explanation: 'entrySet 一次拿到键值对，免去 keySet 方式的二次哈希查找。',
        },
      ],
    },
    {
      id: 'java-ch9',
      title: '第 9 章 常用类库：Object、StringBuilder 与包装类',
      intro: 'Java 的功力一半在语言本身，一半在标准类库。本章掌握每天都会用到的三个"基础设施"：万物之祖 Object、高性能字符串拼接工具 StringBuilder，以及让基本类型也能当对象用的包装类。',
      sections: [
        {
          title: '9.1 Object 类三大方法',
          content: [
            'Java 中所有类都直接或间接继承 `Object`，它是"万物之祖"。即使你写的是 class Student 什么都没继承，编译器也会自动补上 extends Object。',
            'Object 有三个方法几乎必被重写：`toString()` 决定打印对象时显示什么（默认是 类名@哈希码，可读性差）；`equals()` 决定两个对象"内容是否相等"（默认等价于 ==，只比地址）；`hashCode()` 返回对象的哈希值，是 HashMap、HashSet 能高效工作的基础。',
            '重写约定：equals 为 true 的两个对象，hashCode 必须相同；反之不强制。只重写 equals 不重写 hashCode，放进 HashSet 就会出现"相等元素被判为不同"的灵异 bug。',
            'IDE 都能自动生成这三个方法（IntelliJ 中 Alt+Insert），日常开发不必手写，但面试常考它们的约定。',
          ],
          code: {
            lang: 'java',
            caption: '重写 toString 与 equals 的标准姿势',
            source: `class Student {
    String name;
    int age;
    Student(String name, int age) { this.name = name; this.age = age; }

    @Override
    public String toString() {
        return "Student{name=" + name + ", age=" + age + "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;               // 同一个对象
        if (!(o instanceof Student)) return false; // 类型不符
        Student s = (Student) o;
        return age == s.age && name.equals(s.name); // 内容比较
    }

    @Override
    public int hashCode() {
        return name.hashCode() * 31 + age; // 与 equals 字段保持一致
    }
}`,
          },
        },
        {
          title: '9.2 StringBuilder 与字符串拼接性能',
          content: [
            'String 是不可变的：s += "x" 并不是"追加"，而是新建一个更长的字符串并把旧内容整个复制过去。循环里拼接一万次，就复制了一万次，性能雪崩。',
            '`StringBuilder` 是可变的字符序列：append() 直接在内部缓冲区追加，不新建对象。循环拼接请一律用它，完事再 toString() 变回 String。',
            'StringBuilder 的方法可以链式调用：sb.append("a").append(1).append(true)，因为每个方法都返回 this。',
            '还有一个 `StringBuffer`，功能和 StringBuilder 几乎一样，但加了线程同步（更安全也更慢）。单线程环境（绝大多数场景）用 StringBuilder 即可。',
          ],
          code: {
            lang: 'java',
            caption: '循环拼接：String 与 StringBuilder 的天壤之别',
            source: `// 慢：每次循环都新建字符串对象
String s = "";
for (int i = 0; i < 10000; i++) {
    s += i;  // 产生大量临时对象
}

// 快：同一个缓冲区里反复追加
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();`,
          },
        },
        {
          title: '9.3 包装类与 Math、Random',
          content: [
            '基本类型 int、double 不是对象，放不进 List 这类泛型容器。Java 为每个基本类型配了"包装类"：int → Integer、double → Double、char → Character……首字母大写。',
            '装箱与拆箱：Integer n = 10 自动装箱（int 包成 Integer），int x = n 自动拆箱。方便但要警惕：Integer 为 null 时拆箱会抛 NullPointerException。',
            '包装类还带静态工具方法：Integer.parseInt("123") 字符串转整数、Integer.toBinaryString(10) 转二进制串、Integer.MAX_VALUE 最大值。',
            '`Math` 类提供数学函数：Math.abs 绝对值、Math.max/min、Math.pow 幂、Math.sqrt 开方、Math.round 四舍五入、Math.random() 生成 [0,1) 随机小数。`Random` 类则可生成指定范围的随机整数：new Random().nextInt(100) 得到 0~99。',
          ],
          code: {
            lang: 'java',
            caption: '包装类与 Math 常用操作',
            source: `int a = Integer.parseInt("123");     // 字符串 → int
String bin = Integer.toBinaryString(10); // "1010"

double r = Math.sqrt(16);   // 4.0
long t = Math.round(3.6);   // 4
int dice = (int)(Math.random() * 6) + 1; // 1~6 的骰子`,
          },
        },
      ],
      quiz: [
        {
          question: '在循环中拼接大量字符串，应该使用哪个类？',
          options: ['A. String', 'B. StringBuilder', 'C. Object', 'D. Integer'],
          answer: 'B',
          explanation: 'String 不可变，循环拼接会产生大量临时对象；StringBuilder 在内部缓冲区追加，性能高几个数量级。',
        },
        {
          question: '自定义类重写 equals() 却不重写 hashCode()，最直接的后果是？',
          options: ['A. 编译报错', 'B. 放进 HashSet/HashMap 时行为异常', 'C. toString 失效', 'D. 无法创建对象'],
          answer: 'B',
          explanation: 'Hash 容器先按 hashCode 分桶再 equals 比较。两者不一致时，相等的对象可能落进不同的桶，导致重复元素无法识别。',
        },
        {
          question: 'Integer n = null; int x = n; 这行代码会发生什么？',
          answer: '抛出 NullPointerException（空指针异常）',
          explanation: '自动拆箱相当于调用 n.intValue()，n 为 null 时调用方法必然空指针。使用包装类做拆箱前务必判空。',
        },
      ],
    },
    {
      id: 'java-ch10',
      title: '第 10 章 文件与 IO 流入门',
      intro: '程序不能只在内存里打转，读文件、写文件是真实项目的日常。Java 用"流（Stream）"统一抽象了所有输入输出，本章学会最常用的文件读写套路。',
      sections: [
        {
          title: '10.1 File 类：文件的"名片"',
          content: [
            '`File` 类代表磁盘上的一个文件或目录（只是"名片"，不代表内容）。File f = new File("data.txt") 不会创建文件，只是描述这个路径。',
            '常用方法：exists() 是否存在、isFile() / isDirectory() 区分文件与目录、length() 字节数、getName() 文件名、listFiles() 列出目录内容、mkdir() 建目录、delete() 删除。',
            '路径分隔符陷阱：Windows 用 \\，Linux 用 /。写代码时用 / 或 File.separator，可以两边通吃。',
            '相对路径以"程序启动目录"为基准，而不是 .java 文件所在目录——找不到文件时先打印 f.getAbsolutePath() 看看实际在找哪里。',
          ],
          code: {
            lang: 'java',
            caption: 'File 类基本操作',
            source: `import java.io.File;

File dir = new File("reports");
if (!dir.exists()) dir.mkdir();          // 不存在就创建

File f = new File(dir, "a.txt");
System.out.println(f.exists());          // false（还没创建）
System.out.println(f.getAbsolutePath()); // 看看实际路径`,
          },
        },
        {
          title: '10.2 字节流与字符流',
          content: [
            'Java IO 分两大门派：字节流（InputStream/OutputStream，以 byte 为单位，适合图片、音频等一切文件）和字符流（Reader/Writer，以字符为单位，自动处理编码，适合纯文本）。',
            '记法：Stream 结尾的是字节流，Reader/Writer 结尾的是字符流。FileReader、FileWriter 读文本；FileInputStream、FileOutputStream 读二进制。',
            '字符流读写文本时一定指定编码（UTF-8），否则用系统默认编码，换台电脑就乱码。Java 8 起推荐 Files.newBufferedReader(Paths.get("a.txt"), StandardCharsets.UTF_8)。',
            '流是稀缺资源，用完必须 close()。用 try-with-resources 语法可以自动关闭，再也不用手写 finally。',
          ],
          code: {
            lang: 'java',
            caption: 'try-with-resources 读写文本文件',
            source: `import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;

// 写
try (BufferedWriter w = Files.newBufferedWriter(
        Paths.get("a.txt"), StandardCharsets.UTF_8)) {
    w.write("第一行");
    w.newLine();
    w.write("第二行");
}

// 读
try (BufferedReader r = Files.newBufferedReader(
        Paths.get("a.txt"), StandardCharsets.UTF_8)) {
    String line;
    while ((line = r.readLine()) != null) {
        System.out.println(line);
    }
}`,
          },
        },
        {
          title: '10.3 缓冲流与 Files 一行流',
          content: [
            '缓冲流（BufferedReader/BufferedWriter）给普通流加了一个内存缓冲区：攒够一批再真正读写磁盘，速度提升数十倍。读文本务必套一层。',
            'readLine() 是缓冲流最好用的方法：一次读一行，返回 null 表示读完——这是逐行读文件的标准模板。',
            '小文件有更省事的写法：Files.readAllLines(path) 一次读成 List<String>，Files.write(path, lines) 一次写出。大文件别这么干，会撑爆内存。',
            '选型口诀：文本用字符流 + 缓冲，二进制用字节流 + 缓冲，小文件直接 Files 一行搞定。',
          ],
          code: {
            lang: 'java',
            caption: '小文件的一行式读写',
            source: `import java.nio.file.*;
import java.util.List;

List<String> lines = Files.readAllLines(Paths.get("a.txt"));
for (String s : lines) System.out.println(s);

Files.write(Paths.get("b.txt"), lines); // 整体写出到另一个文件`,
          },
        },
      ],
      quiz: [
        {
          question: '读取中文文本文件时为避免乱码，最关键的做法是？',
          options: ['A. 用字节流代替字符流', 'B. 显式指定 UTF-8 编码', 'C. 文件名改成英文', 'D. 关闭缓冲区'],
          answer: 'B',
          explanation: '乱码根源是编码不一致。读写两端都显式指定 StandardCharsets.UTF_8，跨平台也不会出问题。',
        },
        {
          question: 'try (BufferedReader r = ...) { ... } 这种写法的学名和好处是？',
          answer: 'try-with-resources；代码块结束后自动调用 close() 关闭流，即使发生异常也能保证关闭',
          explanation: '实现了 AutoCloseable 接口的资源都可以这样管理，告别 finally 里手写 close 的样板代码。',
        },
        {
          question: '用 readLine() 逐行读文件时，循环结束的判断条件是？',
          answer: 'readLine() 返回 null 时表示读到文件末尾',
          explanation: '标准模板：while ((line = r.readLine()) != null)。注意不要写成 line != null 才赋值，那会死循环。',
        },
      ],
    },
    {
      id: 'java-ch11',
      title: '第 11 章 Lambda 表达式与 Stream API',
      intro: 'Java 8 是这门语言的分水岭：Lambda 让"把函数当参数传"成为现实，Stream 让集合处理像流水线一样优雅。本章带你写出地道的现代 Java。',
      sections: [
        {
          title: '11.1 Lambda 表达式',
          content: [
            '`Lambda` 是匿名函数的简写：(参数) -> { 代码 }。它只能用于"函数式接口"——即只含一个抽象方法的接口，如 Runnable、Comparator。',
            '写法进化史一目了然：匿名内部类 new Comparator(){...} 十几行，Lambda (a, b) -> a - b 一行搞定。',
            'Lambda 的简写规则：参数类型可省略；只有一个参数可省括号；方法体只有一句可省 {} 和 return。',
            '常用函数式接口在 java.util.function 包：Predicate<T> 判断、Function<T,R> 转换、Consumer<T> 消费、Supplier<T> 供给。',
          ],
          code: {
            lang: 'java',
            caption: '从匿名内部类到 Lambda',
            source: `// 旧写法：匿名内部类
list.sort(new Comparator<String>() {
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
});

// Lambda：同样的逻辑一行
list.sort((a, b) -> a.length() - b.length());

// 方法引用：更极致的简写
list.forEach(System.out::println);`,
          },
        },
        {
          title: '11.2 方法引用',
          content: [
            '`方法引用`是 Lambda 的进一步缩写，用 :: 连接：System.out::println 等价于 x -> System.out.println(x)。',
            '四种形态：静态方法引用 Math::max、实例方法引用 s::length、类的实例方法 String::compareTo、构造引用 ArrayList::new。',
            '能用方法引用就不要写 Lambda——更短、更清晰，还能直接复用已有方法。',
          ],
          code: {
            lang: 'java',
            caption: '四种方法引用',
            source: `// 静态方法
Function<Double, Double> f = Math::sqrt;
// 某个对象的方法
Consumer<String> c = System.out::println;
// 任意对象的实例方法（第一个参数当调用者）
Comparator<String> cmp = String::compareToIgnoreCase;
// 构造方法
Supplier<ArrayList<String>> s = ArrayList::new;`,
          },
        },
        {
          title: '11.3 Stream 流式处理',
          content: [
            '`Stream` 是集合的"流水线"：数据源 → 中间操作（filter/map/sorted，懒执行）→ 终端操作（collect/forEach/count，触发计算）。',
            '经典三连：list.stream().filter(x -> x > 60).map(x -> x * 2).collect(Collectors.toList())——筛、变、收。',
            'Stream 不是容器、不存数据；原集合不会被修改；流只能用一次，用完即废。',
            '统计很方便：count()、max()、min()、sum()；分组用 Collectors.groupingBy，连接字符串用 Collectors.joining(",")。',
          ],
          code: {
            lang: 'java',
            caption: 'Stream 经典流水线',
            source: `List<Integer> scores = List.of(90, 45, 78, 60, 88);

List<Integer> passed = scores.stream()
    .filter(s -> s >= 60)          // 及格
    .sorted((a, b) -> b - a)       // 降序
    .collect(Collectors.toList()); // [90, 88, 78, 60]

long count = scores.stream().filter(s -> s >= 60).count(); // 4
int sum = scores.stream().mapToInt(Integer::intValue).sum();`,
          },
        },
      ],
      quiz: [
        {
          question: 'Lambda 表达式可以用于什么样的接口？',
          options: ['A. 任何接口', 'B. 只含一个抽象方法的函数式接口', 'C. 含默认方法的接口', 'D. 抽象类'],
          answer: 'B',
          explanation: 'Lambda 本质是"单方法接口的匿名实现"。接口有多个抽象方法时编译器无法判断实现哪个，会报错。',
        },
        {
          question: 'Stream 的中间操作（如 filter）何时真正执行？',
          answer: '遇到终端操作（collect/forEach/count 等）时才执行——这叫"懒执行"',
          explanation: '只写 filter/map 不产生任何计算，终端操作触发整条流水线一次性求值，这也是 Stream 高效的原因。',
        },
        {
          question: 'list.forEach(System.out::println) 中 System.out::println 是？',
          answer: '方法引用，等价于 Lambda：x -> System.out.println(x)',
          explanation: '它是"某个对象的实例方法引用"，是四种方法引用形态之一。',
        },
      ],
    },
    {
      id: 'java-ch12',
      title: '第 12 章 多线程入门',
      intro: '程序默认只有一个"主线程"顺序执行。多线程让程序同时做多件事：边下载边响应点击、边计算边刷新界面。本章掌握线程的创建、同步与通信的基本概念。',
      sections: [
        {
          title: '12.1 创建线程的两种方式',
          content: [
            '`线程（Thread）`是程序执行的最小单位。main 方法就跑在主线程里，Thread.currentThread().getName() 能看到它叫 "main"。',
            '方式一：继承 Thread 类、重写 run() 方法，然后 start() 启动。注意是 start() 不是 run()——直接调 run() 只是普通方法调用，不会开新线程。',
            '方式二（推荐）：实现 Runnable 接口，把它交给 Thread：new Thread(task).start()。任务与线程分离，更灵活；Lambda 时代可以一行写完。',
            'start() 之后线程"就绪"，何时真正运行由操作系统调度——所以多线程程序的输出顺序通常不确定。',
          ],
          code: {
            lang: 'java',
            caption: '创建并启动线程',
            source: `// 方式一：继承 Thread
class MyThread extends Thread {
    public void run() { System.out.println("子线程运行"); }
}
new MyThread().start();

// 方式二：Runnable + Lambda（推荐）
new Thread(() -> {
    System.out.println("任务在 " +
        Thread.currentThread().getName() + " 中运行");
}).start();`,
          },
        },
        {
          title: '12.2 线程安全与 synchronized',
          content: [
            '`线程安全`问题：多个线程同时改同一份数据，结果不可预料。经典例子：两个线程各自对 count 做 10000 次 ++，结果常小于 20000。',
            '原因：count++ 不是一步完成的（读、加、写三步），两个线程的指令会交错，互相覆盖。',
            '`synchronized` 给代码块或方法上锁：同一时刻只有一个线程能进入，其余排队。锁的对象必须同一个才有效。',
            '口诀：共享可变数据就要同步；局部变量天然安全（每个线程各有一份）。',
          ],
          code: {
            lang: 'java',
            caption: 'synchronized 保护共享计数器',
            source: `class Counter {
    private int count = 0;
    public synchronized void increment() { count++; } // 上锁
    public int get() { return count; }
}

Counter c = new Counter();
Thread t1 = new Thread(() -> { for (int i = 0; i < 10000; i++) c.increment(); });
Thread t2 = new Thread(() -> { for (int i = 0; i < 10000; i++) c.increment(); });
t1.start(); t2.start();
t1.join(); t2.join();          // 等两个线程结束
System.out.println(c.get());   // 稳定输出 20000`,
          },
        },
        {
          title: '12.3 线程生命周期与常用方法',
          content: [
            '线程六态：新建（new）→ 就绪/运行（Runnable）→ 阻塞/等待（Blocked/Waiting）→ 终止（Terminated）。start 后就绪，抢到 CPU 才运行。',
            '`sleep(ms)` 让当前线程睡一会儿（不释放锁）；`join()` 等待另一个线程结束再继续；`yield()` 让出 CPU 重新排队。',
            '中断是"礼貌叫停"：t.interrupt() 只是设置标志位，线程要自己检查并退出——不要再用过时的 stop() 强杀。',
            '线程池（ExecutorService）是工程实践：线程很贵，复用而不是反复新建。Executors.newFixedThreadPool(4) 一行建池。',
          ],
          code: {
            lang: 'java',
            caption: 'sleep / join / 线程池',
            source: `Thread t = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("工作中 " + i);
        try { Thread.sleep(500); } catch (InterruptedException e) { return; }
    }
});
t.start();
t.join(); // 主线程等它干完

// 线程池
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("池中的任务"));
pool.shutdown();`,
          },
        },
      ],
      quiz: [
        {
          question: '启动线程应该调用哪个方法？',
          options: ['A. run()', 'B. start()', 'C. exec()', 'D. begin()'],
          answer: 'B',
          explanation: 'start() 才会创建新线程并异步调用 run()；直接调 run() 只是当前线程里的普通方法调用。',
        },
        {
          question: '两个线程同时对共享变量 count 做自增，结果偏小，根本原因是？',
          answer: 'count++ 是"读-加-写"三步操作，线程指令交错导致互相覆盖（非原子操作）',
          explanation: '解决：synchronized 加锁，或使用 AtomicInteger 等原子类。',
        },
        {
          question: 'join() 方法的作用是？',
          answer: '让当前线程等待目标线程执行结束后再继续',
          explanation: '常用于主线程汇总子线程结果的场景，如 t.join() 后再读取 t 计算的数据。',
        },
      ],
    },
    {
      id: 'java-ch13',
      title: '第 13 章 正则表达式与文本处理',
      intro: '验证手机号、提取日志里的 IP、批量替换格式——这类文本问题用正则表达式一行解决。本章系统学习正则语法与 Java 中的 Pattern/Matcher 用法。',
      sections: [
        {
          title: '13.1 正则语法速通',
          content: [
            '`正则表达式`是用一套符号描述文本模式的"迷你语言"。\\d 数字、\\w 单词字符、\\s 空白；. 任意字符；[abc] 三者之一；[^abc] 取反。',
            '量词控制次数：* 零到多次、+ 至少一次、? 零或一次、{n} 恰好 n 次、{n,m} 区间。" greedy 贪婪"是默认——能多吃就多吃，加 ? 变"懒惰"。',
            '^ 和 $ 锚定首尾；() 分组还能"捕获"内容；(?:...) 分组不捕获；| 表示"或"。',
            'Java 字符串里写正则，反斜杠要双写：想匹配数字写 "\\\\d"，这是最容易忘的一点。',
          ],
          code: {
            lang: 'java',
            caption: '常见正则模式',
            source: `String phone = "1[3-9]\\\\d{9}";        // 手机号
String email = "\\\\w+@[\\\\w.]+";        // 简易邮箱
String qq = "[1-9]\\\\d{4,10}";           // QQ 号
String date = "\\\\d{4}-\\\\d{2}-\\\\d{2}"; // 2026-10-07

System.out.println("13812345678".matches(phone)); // true`,
          },
        },
        {
          title: '13.2 matches、split 与 replaceAll',
          content: [
            'String 自带三个正则方法：matches() 整体匹配（要求整串符合模式）；split() 按正则切分；replaceAll() 按正则替换。',
            'split 的经典用法："a, b,c ; d".split("[,;]\\\\s*") 同时按逗号分号切并吃掉空格。',
            'replaceAll 里 $1 引用第一个捕获组：把 (\\\\d{4})-(\\\\d{2})-(\\\\d{2}) 替换成 $2/$3/$1 就完成日期格式转换。',
          ],
          code: {
            lang: 'java',
            caption: '一行正则解决文本清洗',
            source: `String s = "苹果, 香蕉;橘子,  葡萄";
String[] fruits = s.split("[,;]\\\\s*");
// [苹果, 香蕉, 橘子, 葡萄]

// 隐藏手机号中间四位
String masked = "13812345678".replaceAll("(\\\\d{3})\\\\d{4}(\\\\d{4})", "$1****$2");
// 138****5678`,
          },
        },
        {
          title: '13.3 Pattern 与 Matcher',
          content: [
            '需要反复用同一个模式时，先编译成 `Pattern` 对象：Pattern p = Pattern.compile("\\\\d+")，比每次 matches 快。',
            '`Matcher` 是"匹配器"：m.find() 找下一个匹配位置（可循环找全部），m.group() 取出匹配内容，m.group(1) 取第一个捕获组。',
            'matches 与 find 的区别：matches 要求整串匹配，find 是在串中"寻找"匹配片段——提取场景都用 find。',
            '日志分析、爬虫解析、输入校验都靠这套组合拳：compile 一次，find 循环，group 提取。',
          ],
          code: {
            lang: 'java',
            caption: '从日志中提取所有 IP 地址',
            source: `String log = "用户 192.168.1.1 登录，来自 10.0.0.8 的请求被拒绝";
Pattern p = Pattern.compile("\\\\d+\\\\.\\\\d+\\\\.\\\\d+\\\\.\\\\d+");
Matcher m = p.matcher(log);
while (m.find()) {
    System.out.println("发现 IP: " + m.group());
}
// 发现 IP: 192.168.1.1
// 发现 IP: 10.0.0.8`,
          },
        },
      ],
      quiz: [
        {
          question: 'Java 代码中要匹配一个数字，正则字符串应写成？',
          options: ['A. "\\d"', 'B. "\\\\d"', 'C. "/d"', 'D. "[数字]"'],
          answer: 'B',
          explanation: 'Java 字符串中 \\\\ 才表示一个真正的反斜杠，所以正则的 \\d 要写成 "\\\\d"。',
        },
        {
          question: 'String.matches() 与 Matcher.find() 的区别是？',
          answer: 'matches 要求整个字符串完全匹配模式；find 在字符串中寻找下一个匹配的片段，可循环找全部',
          explanation: '校验用 matches（如手机号校验），提取用 find（如从日志中抓 IP）。',
        },
        {
          question: '正则 (\\d{4})-(\\d{2})-(\\d{2}) 中，replaceAll 的替换串 "$3/$2/$1" 效果是？',
          answer: '把 2026-10-07 变成 07/10/2026——$n 引用第 n 个捕获组的内容',
          explanation: '捕获组按左括号顺序编号，替换串中用 $1、$2、$3 引用它们，实现重排。',
        },
      ],
    },
    {
      id: 'java-ch14',
      title: '第 14 章 Java 新特性速览',
      intro: 'Java 每半年一个版本，新写法层出不穷。本章精选最实用的现代特性：var 类型推断、record 记录类、增强 switch、文本块，让你的代码立刻"年轻十岁"。',
      sections: [
        {
          title: '14.1 var 局部变量类型推断',
          content: [
            '`var`（Java 10+）让编译器根据右边推断类型：var list = new ArrayList<String>() 省去一长串重复。',
            'var 不是动态类型！类型在编译期就确定了，之后不可变——只是把书写权交给编译器。',
            '使用边界：只能用于局部变量且必须同时初始化；var x; 或 var x = null 都编译不过。',
            '建议：右边类型一目了然时用 var（new 对象、工厂方法）；看不出类型时老老实实写全。',
          ],
          code: {
            lang: 'java',
            caption: 'var 的正确打开方式',
            source: `var name = "弈";                    // String
var scores = new ArrayList<Integer>(); // ArrayList<Integer>
var map = new HashMap<String, Integer>(); // 省去重复

// var x;        // 错误：必须初始化
// var y = null; // 错误：推断不出类型

for (var i = 0; i < 10; i++) { }   // 循环里也能用`,
          },
        },
        {
          title: '14.2 record 记录类',
          content: [
            '`record`（Java 16+ 正式）一行定义"纯数据类"：record Point(int x, int y) {}，自动生成构造方法、getter、equals、hashCode、toString。',
            '以前写一个 POJO 要五六十行模板代码，record 一行搞定——这就是它存在的意义。',
            'record 天生不可变：没有 setter，字段是 final 的。getter 名字不带 get：p.x() 而不是 p.getX()。',
            '适合：DTO 数据传输对象、方法的复合返回值、Map 的复合键。不适合：需要改字段的场景。',
          ],
          code: {
            lang: 'java',
            caption: 'record 一行顶五十行',
            source: `record Point(int x, int y) {}  // 完！
record Student(String name, int score) {}

Point p = new Point(3, 4);
System.out.println(p.x());   // 3（注意：不是 getX()）
System.out.println(p);       // Point[x=3, y=4]（自动 toString）

// record 自带正确的 equals：
new Point(1, 2).equals(new Point(1, 2)); // true`,
          },
        },
        {
          title: '14.3 增强 switch 与文本块',
          content: [
            '`switch 表达式`（Java 14+）用箭头语法：case 1 -> "一"，不再有穿透问题，还能直接返回值：String s = switch(day){ ... };。',
            '箭头分支不用写 break；多条语句用 {} 包起来并用 yield 返回值。',
            '`文本块`（Java 15+）三个引号 """ 包起来的多行字符串，写 SQL、JSON、HTML 片段再也不用拼加号和转义。',
            'instanceof 模式匹配：if (o instanceof String s) 判断+强转一步到位，s 直接可用。',
          ],
          code: {
            lang: 'java',
            caption: '现代 switch 与文本块',
            source: `String level = switch (score / 10) {
    case 10, 9 -> "优秀";
    case 8, 7  -> "良好";
    case 6     -> "及格";
    default    -> "不及格";
};  // 没有 break，不会穿透

String json = """
    {
      "name": "弈",
      "lang": "Java"
    }
    """;  // 多行字符串，无需拼接

if (obj instanceof String s && s.length() > 3) { /* s 已是 String */ }`,
          },
        },
      ],
      quiz: [
        {
          question: 'var name = "弈"; 之后 name 的类型是？',
          options: ['A. Object，可再赋任意值', 'B. String，编译期就确定且不可改变', 'C. var 类型', 'D. 运行期才确定'],
          answer: 'B',
          explanation: 'var 只是编译期的"书写省略"，推断为 String 后就是彻底的 String，再赋数字会编译报错。',
        },
        {
          question: 'record Point(int x, int y) {} 会自动生成哪些成员？',
          answer: '构造方法、x()/y() 访问器、equals()、hashCode()、toString()，且字段为 final 不可变',
          explanation: 'record 专为"不可变数据载体"设计，省掉全部模板代码；需要可变字段时仍用普通 class。',
        },
        {
          question: '增强 switch 表达式相比老式 switch 的两点改进是？',
          answer: '箭头分支不会穿透（无需 break）；switch 可以作为表达式直接返回值',
          explanation: 'case A -> 语句 的形式从根本上消除了忘记 break 的穿透 bug，yield 用于块内返回值。',
        },
      ],
    },
    {
      id: 'java-ch15',
      title: '第 15 章 常见设计模式入门',
      intro: '设计模式是前人踩坑后总结的"套路"。本章讲透面试与工程中最常出现的三个：单例、工厂、观察者，理解"为什么这样设计"比背代码更重要。',
      sections: [
        {
          title: '15.1 单例模式',
          content: [
            '`单例（Singleton）`保证一个类全程序只有一个实例：数据库连接池、配置管理器都适合单例。',
            '实现要点：构造方法私有化（外面 new 不了）+ 静态方法返回唯一实例。',
            '饿汉式：类加载时就创建（简单但可能浪费）；懒汉式：用时才创建（要注意线程安全，加 synchronized 或双重检查锁）。',
            '最优雅的写法是枚举单例：enum Singleton { INSTANCE }，天然防反射攻击和序列化破坏，一行到位。',
          ],
          code: {
            lang: 'java',
            caption: '三种单例写法',
            source: `// 饿汉式：类加载即创建
class Config1 {
    private static final Config1 INSTANCE = new Config1();
    private Config1() {}
    public static Config1 getInstance() { return INSTANCE; }
}

// 懒汉式（双重检查锁，线程安全）
class Config2 {
    private static volatile Config2 instance;
    private Config2() {}
    public static Config2 getInstance() {
        if (instance == null) {
            synchronized (Config2.class) {
                if (instance == null) instance = new Config2();
            }
        }
        return instance;
    }
}

// 枚举单例：最简单最安全
enum Config3 { INSTANCE }`,
          },
        },
        {
          title: '15.2 工厂模式',
          content: [
            '`工厂模式`把"创建对象"这件事交给专门的工厂方法，调用方只说"我要一个圆的"，不用关心 new 的是哪个具体类。',
            '简单工厂：一个静态方法按参数返回不同子类对象，如 ShapeFactory.create("circle")。',
            '价值在于解耦：新增一种图形时只改工厂，调用方代码一行不动——这就是"开闭原则"（对扩展开放、对修改关闭）。',
            'JDK 里的身影：Integer.valueOf()、Calendar.getInstance() 都是工厂方法的例子。',
          ],
          code: {
            lang: 'java',
            caption: '简单工厂：按名字造对象',
            source: `interface Shape { void draw(); }
class Circle implements Shape { public void draw() { System.out.println("画圆"); } }
class Square implements Shape { public void draw() { System.out.println("画方"); } }

class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            case "square" -> new Square();
            default -> throw new IllegalArgumentException("未知图形");
        };
    }
}

Shape s = ShapeFactory.create("circle"); // 调用方不认识 Circle
s.draw();`,
          },
        },
        {
          title: '15.3 观察者模式',
          content: [
            '`观察者模式`定义"一对多"的订阅关系：被观察者状态一变，所有订阅者自动收到通知。按钮点击、消息推送、事件总线都是它。',
            '两个角色：Subject（主题，维护观察者列表、负责通知）和 Observer（观察者，实现 update 方法）。',
            '流程：观察者调用 subject.attach(o) 订阅；主题变化时遍历列表逐个 o.update()。',
            'GUI 的事件监听、MQ 消息订阅、前端框架的数据绑定，本质都是观察者模式的变体。',
          ],
          code: {
            lang: 'java',
            caption: '公众号推送 = 观察者模式',
            source: `interface Observer { void update(String article); }

class OfficialAccount {  // 被观察者
    private List<Observer> subs = new ArrayList<>();
    public void subscribe(Observer o) { subs.add(o); }
    public void publish(String article) {
        for (Observer o : subs) o.update(article); // 通知所有订阅者
    }
}

OfficialAccount account = new OfficialAccount();
account.subscribe(article -> System.out.println("弈 收到：" + article));
account.publish("Java 设计模式详解"); // 弈 收到：Java 设计模式详解`,
          },
        },
      ],
      quiz: [
        {
          question: '单例模式的两个核心实现要点是？',
          options: ['A. 继承 + 多态', 'B. 私有构造方法 + 静态方法返回唯一实例', 'C. final 类 + final 方法', 'D. 接口 + 抽象类'],
          answer: 'B',
          explanation: '私有化构造方法堵住外部 new 的通道，静态方法掌握唯一实例的发放权，二者缺一不可。',
        },
        {
          question: '工厂模式最大的好处是？',
          answer: '解耦对象的创建与使用：新增产品类时调用方代码不用修改（开闭原则）',
          explanation: '调用方只依赖接口和工厂，不认识具体类；扩展时只改工厂一处。',
        },
        {
          question: '观察者模式适合什么场景？',
          answer: '一个对象的状态变化需要自动通知多个对象：事件监听、消息订阅、数据绑定等',
          explanation: '核心是"订阅-通知"机制，让主题和订阅者互不直接依赖，随时可增删观察者。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'java-p1',
      title: '读程序写结果：自增自减与运算优先级',
      category: '读程序写结果',
      difficulty: 2,
      analysis: [
        '这类题考查 i++ / ++i 在表达式中的求值顺序。核心规则：后缀形式先取旧值参与运算，整个表达式结束后变量才加 1。',
        '解题模板：列一张"变量变化表"，每执行一句记录每个变量的当前值，特别注意赋值本身也是表达式。',
      ],
      keyPoints: ['i++ 返回旧值', '++i 返回新值', '复合赋值自带强转', '赋值表达式的值就是被赋的值'],
      example: {
        question: '阅读以下代码，写出输出结果。',
        code: `int i = 1;
int j = i++ + ++i + i;
System.out.println(i + "," + j);`,
        answer: '3,7',
        explanation: 'i++ 取 1（i 变 2），++i 使 i 变 3 并取 3，最后一项 i 为 3，j = 1+3+3 = 7，i 最终为 3。',
      },
      traps: ['误以为 i++ 立即加 1 再参与当前运算', '忘记赋值语句左侧变量的最终值可能被覆盖', '混淆 = 与 =='],
    },
    {
      id: 'java-p2',
      title: '选择题：String 常量池与 == / equals',
      category: '选择题',
      difficulty: 3,
      analysis: [
        'Java 选择题最爱考字符串相等性。判断流程：先看创建方式（字面量 / new / intern），再看比较的是地址（==）还是内容（equals）。',
        '口诀：字面量进常量池，new 必开新对象，内容比较用 equals。',
      ],
      keyPoints: ['字面量复用常量池', 'new String() 至少创建一个对象', 'equals 比较内容', 'String 不可变'],
      example: {
        question: 'String a = "hello"; String b = "hello"; String c = new String("hello"); 下列结果为 true 的是？',
        answer: 'a == b 为 true；a == c 为 false；a.equals(c) 为 true',
        explanation: 'a、b 指向常量池同一对象；c 是堆中新对象，地址不同但内容相同。',
      },
      traps: ['用 == 比较内容', '认为 new String("hello") 只创建一个对象（常量池无 "hello" 时会创建两个）', '忽略 intern() 的作用'],
    },
    {
      id: 'java-p3',
      title: '程序改错：静态方法与成员访问',
      category: '程序改错',
      difficulty: 3,
      analysis: [
        'static 方法属于类，执行时不依赖任何实例，因此内部没有 this。在 static 方法中直接访问非静态成员是编译错误。',
        '改错思路二选一：把被访问的成员也改成 static；或在 static 方法中先创建对象，通过对象访问。',
      ],
      keyPoints: ['static 无 this', '类名.static成员', '实例成员必须先有对象'],
      example: {
        question: '找出错误并改正：class Demo { int x = 5; public static void main(String[] args) { System.out.println(x); } }',
        answer: 'main 是 static，不能直接访问实例变量 x。改为：System.out.println(new Demo().x); 或把 x 声明为 static int x = 5;',
        explanation: '静态上下文中不存在当前对象，编译器报"无法从静态上下文引用非静态变量"。',
      },
      traps: ['误以为 main 在类内部就能访问所有成员', '改正时漏掉创建对象', '混淆 static 变量与实例变量的生命周期'],
    },
    {
      id: 'java-p4',
      title: '编程题：数组类算法（排序/查找/统计）',
      category: '编程题',
      difficulty: 3,
      analysis: [
        '数组编程题是考试压轴常客。通用步骤：①读题确定输入输出格式；②选择算法框架（双重循环排序 / 单循环统计 / 二分查找）；③注意边界（length-1、越界）。',
        '答题规范：变量命名见名知意，临界条件写注释，最后务必用样例数据手工走一遍。',
      ],
      keyPoints: ['冒泡/选择排序模板', '二分查找三要素：low high mid', '统计题用计数器或 Map', '注意空数组与单元素边界'],
      example: {
        question: '输入 10 个整数，输出最大值及其第一次出现的下标。',
        code: `int[] a = {3, 9, 1, 9, 5, 7, 9, 2, 8, 4};
int max = a[0], idx = 0;
for (int i = 1; i < a.length; i++) {
    if (a[i] > max) { max = a[i]; idx = i; }
}
System.out.println("最大值=" + max + ", 下标=" + idx);`,
        answer: '最大值=9, 下标=1',
        explanation: '用"打擂台"法：max 记录当前最大值，遇到严格更大的才更新，保证 idx 是第一次出现的位置。注意用 > 而非 >=。',
      },
      traps: ['用 >= 导致拿到最后一次出现的下标', '循环从 0 开始与自己比较（无害但不规范）', '数组为空时 a[0] 直接越界'],
    },
    {
      id: 'java-p5',
      title: '读程序写结果：继承与多态',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        '多态题的口诀：编译看左，运行看右（仅对方法）；成员变量无多态，永远看左边类型。',
        '解题步骤：先标出每个对象的实际类型；再逐条调用，判断走的是父类还是子类的方法体；注意 super 调用链。',
      ],
      keyPoints: ['动态绑定只针对实例方法', '成员变量静态绑定', '构造方法中调用重写方法会执行子类版本', 'static 方法无多态'],
      example: {
        question: '写出输出结果。',
        code: `class A {
    int x = 1;
    void show() { System.out.println("A:" + x); }
}
class B extends A {
    int x = 2;
    void show() { System.out.println("B:" + x); }
}
public class Main {
    public static void main(String[] args) {
        A obj = new B();
        obj.show();
        System.out.println(obj.x);
    }
}`,
        answer: 'B:2 换行 1',
        explanation: 'show() 是重写方法，运行时执行子类 B 的版本，且方法内 x 是 B 的 2；而 obj.x 是成员变量访问，静态绑定看声明类型 A，输出 1。',
      },
      traps: ['以为成员变量也会多态', '忽略构造顺序：父类构造先于子类执行', '混淆重载（编译期）与重写（运行期）'],
    },
    {
      id: 'java-p6',
      title: '选择题：异常执行顺序与 finally',
      category: '选择题',
      difficulty: 4,
      analysis: [
        '考查 try-catch-finally 的执行顺序与返回值覆盖问题。画图法：沿代码走一遍控制流，标出每个 return 的时机。',
        '黄金规则：finally 一定执行（除非 System.exit）；finally 中的 return 会覆盖其他 return；返回值若是基本类型，在 return 瞬间已确定副本。',
      ],
      keyPoints: ['finally 必执行', 'finally 的 return 覆盖一切', 'catch 匹配顺序：子类在前', '受检异常必须处理或声明'],
      example: {
        question: '以下方法返回什么？int f() { int x = 1; try { return x; } finally { x = 2; } }',
        answer: '返回 1',
        explanation: 'return x 先把 x 的值 1 复制为返回值，然后执行 finally 把 x 改成 2，但返回值副本不受影响。',
      },
      traps: ['以为 finally 改了变量返回值就变', '多个 catch 把父类异常写在前面（编译错误）', '忘记 finally 里 return 会吞掉异常'],
    },
    {
      id: 'java-p7',
      title: '程序填空：集合遍历与泛型',
      category: '程序填空',
      difficulty: 3,
      analysis: [
        '程序填空常给一段不完整的集合操作代码。先通读理解功能，再根据上下文推断空格里需要的 API 或类型参数。',
        '高频空格：增强 for 的声明、entrySet/keySet、Iterator 的 hasNext/next、泛型钻石 <>。',
      ],
      keyPoints: ['Map.Entry 遍历', 'Iterator 三件套', '自动装箱拆箱', 'Collections.sort / Arrays.sort'],
      example: {
        question: '补全代码实现统计字符串中每个字符出现次数。',
        code: `Map<Character, Integer> map = new HashMap<>();
for (char c : "abracadabra".toCharArray()) {
    map.put(c, map.getOrDefault(c, 0) + 1);
}`,
        answer: '空格处通常填 map.getOrDefault(c, 0) + 1',
        explanation: 'getOrDefault 避免了对不存在的键判空，一行完成"取出旧计数+1 放回"。',
      },
      traps: ['get() 返回 null 时拆箱抛 NPE', 'for-each 遍历 Map 必须先转成 Set', '字符与字符串类型混用'],
    },
    {
      id: 'java-p8',
      title: '编程题：面向对象综合设计',
      category: '编程题',
      difficulty: 5,
      analysis: [
        '综合题通常要求按描述设计类体系：抽象出父类/接口 → 确定属性与构造方法 → 重写关键方法 → 在测试类中演示多态。',
        '评分点：封装（private + getter/setter）、继承结构合理、重写 toString、主方法演示多态数组。',
      ],
      keyPoints: ['封装四步', 'extends / implements 选择', 'super 调用父类构造', '多态数组统一处理'],
      example: {
        question: '设计形状体系：抽象类 Shape 含抽象方法 area()；子类 Circle、Rectangle 实现面积计算；主方法用 Shape 数组输出各形状面积。',
        code: `abstract class Shape { abstract double area(); }
class Circle extends Shape {
    double r; Circle(double r){ this.r = r; }
    double area(){ return 3.14159 * r * r; }
}
class Rectangle extends Shape {
    double w, h; Rectangle(double w, double h){ this.w=w; this.h=h; }
    double area(){ return w * h; }
}`,
        answer: 'main 中：Shape[] ss = { new Circle(2), new Rectangle(3,4) }; for (Shape s : ss) System.out.println(s.area()); 输出 12.56636 与 12.0',
        explanation: '父类引用数组持有不同子类对象，循环中 area() 动态绑定到各自实现，是多态的典型应用。',
      },
      traps: ['抽象类试图 new 实例', '子类构造忘记 super 传参', 'area() 返回值类型不一致'],
    },
  ],
  exercises: [
    {
      id: 'java-e1', type: 'choice', title: '基本类型取值范围', difficulty: 1, tags: ['数据类型'],
      question: '下列关于 Java 基本数据类型的说法，正确的是？',
      options: [
        'A. boolean 类型可以用 0 和 1 表示',
        'B. byte 的取值范围是 -128 ~ 127',
        'C. float 类型的字面量可以不加后缀直接赋值',
        'D. char 类型占 1 个字节',
      ],
      answer: 'B',
      explanation: 'byte 占 1 字节，范围 -128~127。boolean 只有 true/false；float 字面量必须加 f；char 占 2 字节（Unicode）。',
    },
    {
      id: 'java-e2', type: 'choice', title: '运算结果判断', difficulty: 2, tags: ['运算符'],
      question: '执行 int a = 7, b = 2; System.out.println(a / b + " " + a % b); 输出为？',
      options: ['A. 3.5 1', 'B. 3 1', 'C. 3 -1', 'D. 4 1'],
      answer: 'B',
      explanation: '整数除法截断小数：7/2=3；取余 7%2=1。注意 " " 前后发生字符串拼接。',
    },
    {
      id: 'java-e3', type: 'choice', title: 'switch 穿透', difficulty: 3, tags: ['流程控制'],
      question: '执行以下代码输出什么？int x = 2; switch(x){ case 1: System.out.print("A"); case 2: System.out.print("B"); case 3: System.out.print("C"); default: System.out.print("D"); }',
      options: ['A. B', 'B. BC', 'C. BCD', 'D. 编译错误'],
      answer: 'C',
      explanation: 'case 2 匹配后没有 break，发生穿透，依次执行 case 3 与 default，输出 BCD。',
    },
    {
      id: 'java-e4', type: 'choice', title: '字符串比较', difficulty: 3, tags: ['String'],
      question: 'String s1 = "abc"; String s2 = new String("abc"); 下列表达式结果为 true 的是？',
      options: ['A. s1 == s2', 'B. s1.equals(s2)', 'C. s1 == s2.intern() 为 false', 'D. 以上都不对'],
      answer: 'B',
      explanation: 's2 是堆中新对象，== 为 false；equals 比较内容为 true；s2.intern() 返回常量池引用，与 s1 相等，故 C 错。',
    },
    {
      id: 'java-e5', type: 'choice', title: '继承与构造', difficulty: 4, tags: ['面向对象'],
      question: '关于继承中构造方法的调用，下列说法错误的是？',
      options: [
        'A. 子类构造方法默认在第一行隐式调用 super()',
        'B. 如果父类没有无参构造，子类必须显式调用 super(参数)',
        'C. this() 和 super() 可以出现在同一个构造方法中',
        'D. 创建子类对象时父类构造先于子类构造执行',
      ],
      answer: 'C',
      explanation: 'this() 和 super() 都要求占据构造方法第一行，二者冲突，不能同时使用。',
    },
    {
      id: 'java-e6', type: 'fill', title: '补全素数判断', difficulty: 3, tags: ['循环', '算法'],
      question: '补全代码，判断 n 是否为素数：for (int i = 2; i <= Math.sqrt(n); i++) { if (n % i == 0) { isPrime = ______; break; } }',
      answer: 'false',
      explanation: '找到因子即非素数，置 isPrime 为 false 并立即 break 提高效率。',
    },
    {
      id: 'java-e7', type: 'fill', title: '数组默认值', difficulty: 2, tags: ['数组'],
      question: '执行 int[] arr = new int[3]; System.out.println(arr[0]); 输出结果为 ______。',
      answer: '0',
      explanation: '数组是引用类型，创建后元素自动初始化为默认值，int 型默认值为 0。',
    },
    {
      id: 'java-e8', type: 'coding', title: 'Hello Java：输出与循环', difficulty: 1, tags: ['入门', '循环'],
      question: '编写程序：第一行输出 "Hello Java"，第二行计算并输出 1 到 10 的和，格式为 "sum = 55"。',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // 在这里编写你的代码

    }
}`,
      expectedOutput: 'Hello Java\nsum = 55',
      answer: '使用 System.out.println 输出字符串，for 循环累加 1~10。',
      explanation: '考查最基本的输出语句与 for 循环结构，注意字符串拼接格式。',
      hints: ['System.out.println 自动换行', 'int sum = 0; for (int i = 1; i <= 10; i++) sum += i;'],
    },
    {
      id: 'java-e9', type: 'coding', title: '九九乘法表', difficulty: 2, tags: ['循环', '嵌套循环'],
      question: '输出九九乘法表的前三行，格式如下：\n1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9\n（每行末尾不留空格，列之间用一个空格分隔）',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // 外层循环控制行

        // 内层循环控制列

    }
}`,
      expectedOutput: '1*1=1\n1*2=2 2*2=4\n1*3=3 2*3=6 3*3=9',
      answer: '双重循环：外层 i 从 1 到 3，内层 j 从 1 到 i，拼接 j+"*"+i+"="+(i*j)，列间加空格。',
      explanation: '经典嵌套循环题。内层上界等于外层变量，体现"第 i 行有 i 列"的规律。',
      hints: ['j <= i', '用 print/println 组合控制空格与换行'],
    },
    {
      id: 'java-e10', type: 'coding', title: '数组最大值与下标', difficulty: 3, tags: ['数组', '算法'],
      question: '给定数组 int[] a = {3, 9, 1, 9, 5};，输出最大值及其第一次出现的下标，格式："max=9 index=1"。',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] a = {3, 9, 1, 9, 5};
        // 打擂台法找最大值

    }
}`,
      expectedOutput: 'max=9 index=1',
      answer: 'max 与 idx 初始化为 a[0] 与 0，遍历比较，严格大于才更新。',
      explanation: '用 > 而不是 >=，保证重复最大值时记录的是第一次出现的下标。',
      hints: ['int max = a[0], idx = 0;', 'if (a[i] > max) 才更新'],
    },
    {
      id: 'java-e11', type: 'coding', title: '反转字符串', difficulty: 3, tags: ['String', '算法'],
      question: '将字符串 "CodeMatrix" 逐字符反转后输出，结果为 "xirtaMedoC"。要求使用 for 循环与 charAt 从后往前输出。',
      starterCode: `public class Main {
    public static void main(String[] args) {
        String s = "CodeMatrix";
        // 从最后一个字符开始往前输出

    }
}`,
      expectedOutput: 'xirtaMedoC',
      answer: 'for (int i = s.length() - 1; i >= 0; i--) System.out.print(s.charAt(i));',
      explanation: 's.length() 取长度，最后一个字符下标是 length()-1；charAt(i) 取出第 i 个字符，print 不换行逐个输出即完成反转。',
      hints: ['int i = s.length() - 1', '循环条件 i >= 0', 'System.out.print(s.charAt(i)) 不换行'],
    },
    {
      id: 'java-e12', type: 'coding', title: '统计字符出现次数', difficulty: 4, tags: ['String', '循环'],
      question: '统计字符串 "banana" 中字符 \'a\' 出现的次数，输出格式："a = 3"。要求用 charAt 遍历判断。',
      starterCode: `public class Main {
    public static void main(String[] args) {
        String s = "banana";
        int count = 0;
        // 遍历字符串，统计 'a' 的个数

        System.out.println("a = " + count);
    }
}`,
      expectedOutput: 'a = 3',
      answer: 'for (int i = 0; i < s.length(); i++) { if (s.charAt(i) == \'a\') count++; }',
      explanation: '逐字符与 \'a\' 比较，相等则计数器加一。注意字符比较用 ==（char 是基本类型），字符串比较才需要 equals。',
      hints: ['i < s.length()', 's.charAt(i) == \'a\'', 'count++ 别忘了'],
    },
    {
      id: 'java-e13', type: 'choice', title: '类型提升与溢出', difficulty: 4, tags: ['数据类型'],
      question: 'byte b = (byte) 130; System.out.println(b); 输出为？',
      options: ['A. 130', 'B. -126', 'C. 编译错误', 'D. -127'],
      answer: 'B',
      explanation: 'byte 范围 -128~127，130 强转后按补码回绕：130 - 256 = -126。',
    },
    {
      id: 'java-e14', type: 'choice', title: '多态与成员变量', difficulty: 5, tags: ['面向对象', '多态'],
      question: 'class A { int x = 1; } class B extends A { int x = 2; } 执行 A a = new B(); System.out.println(a.x); 输出？',
      options: ['A. 2', 'B. 1', 'C. 编译错误', 'D. 运行异常'],
      answer: 'B',
      explanation: '成员变量没有多态！访问看声明类型（左边），输出 A 的 x = 1。只有实例方法才动态绑定。',
    },
    {
      id: 'java-e15', type: 'choice', title: 'finally 与返回值', difficulty: 5, tags: ['异常'],
      question: 'int f() { try { return 1; } finally { return 2; } } 调用 f() 返回？',
      options: ['A. 1', 'B. 2', 'C. 编译错误', 'D. 抛出异常'],
      answer: 'B',
      explanation: 'finally 中的 return 会覆盖 try 中的 return。这种写法能编译但极不推荐——它会吞掉异常。',
    },
    {
      id: 'java-e16', type: 'choice', title: 'Integer 缓存陷阱', difficulty: 5, tags: ['包装类'],
      question: 'Integer a = 127, b = 127; Integer c = 128, d = 128; a == b 与 c == d 的结果分别是？',
      options: ['A. true true', 'B. true false', 'C. false false', 'D. false true'],
      answer: 'B',
      explanation: 'Integer 缓存了 -128~127 的对象，127 装箱复用缓存所以 == 为 true；128 超出缓存每次新建对象，== 为 false。',
    },
    {
      id: 'java-e17', type: 'choice', title: '字符串拼接性能', difficulty: 4, tags: ['String'],
      question: '循环内拼接十万次字符串，正确的做法是？',
      options: ['A. str += "x"', 'B. str.concat("x")', 'C. 用 StringBuilder 的 append', 'D. StringBuffer 一定最快'],
      answer: 'C',
      explanation: 'String 不可变，+= 每次新建对象，O(n²) 灾难；单线程用 StringBuilder（无同步开销）最快，多线程才用 StringBuffer。',
    },
    {
      id: 'java-e18', type: 'choice', title: '抽象类辨析', difficulty: 4, tags: ['面向对象'],
      question: '关于抽象类，下列说法正确的是？',
      options: [
        'A. 抽象类必须有抽象方法',
        'B. 抽象类不能创建对象，但可以有构造方法',
        'C. 抽象方法可以有方法体',
        'D. 抽象类不能被继承',
      ],
      answer: 'B',
      explanation: '抽象类不能实例化，但构造方法供子类 super() 调用；可以没有抽象方法；抽象方法没有方法体。',
    },
    {
      id: 'java-e19', type: 'fill', title: '补全二分查找', difficulty: 4, tags: ['算法', '数组'],
      question: '补全二分查找关键行：while (low <= high) { int mid = (low + high) / 2; if (a[mid] == key) break; else if (a[mid] < key) low = ______; else high = mid - 1; }',
      answer: 'mid + 1',
      explanation: 'a[mid] < key 说明目标在右半区，左边界收紧到 mid+1（mid 已比较过，可跳过）。',
    },
    {
      id: 'java-e20', type: 'fill', title: '方法重写辨析', difficulty: 3, tags: ['面向对象'],
      question: '子类重写父类方法时，访问修饰符的权限可以______（扩大/缩小），返回值类型可以是父类返回值的______。',
      answer: '扩大（不能缩小）；子类（协变返回）',
      explanation: '重写规则"一大一小"：权限不能更严格，返回值可以是子类型。',
    },
    {
      id: 'java-e21', type: 'fill', title: 'HashMap 去重键', difficulty: 4, tags: ['集合'],
      question: 'Map<String, Integer> m = new HashMap<>(); m.put("a", 1); m.put("a", 2); 则 m.get("a") 的值为 ______。',
      answer: '2',
      explanation: 'Map 键唯一，重复 put 同键会覆盖旧值并返回旧值。',
    },
    {
      id: 'java-e22', type: 'coding', title: '统计 1~100 中素数个数', difficulty: 4, tags: ['循环', '算法'],
      question: '计算并输出 1 到 100 之间素数的个数，格式："count = 25"。（提示：1 不是素数，2 是最小素数）',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        // 枚举 2~100，逐个判断素数

        System.out.println("count = " + count);
    }
}`,
      expectedOutput: 'count = 25',
      answer: '外层枚举 n 从 2 到 100，内层 i 从 2 到 n-1 试除，若能整除则标记非素数并 break，否则计数加一。',
      explanation: '100 以内共 25 个素数。试除到 √n 即可，但试除到 n-1 也能得到正确答案（稍慢）。',
      hints: ['for (int n = 2; n <= 100; n++)', '内层 for (int i = 2; i < n; i++) if (n % i == 0) 标记', '用 boolean flag 记录'],
    },
    {
      id: 'java-e23', type: 'coding', title: '打印直角三角形', difficulty: 3, tags: ['循环', '图形'],
      question: '用星号打印 5 行直角三角形：\n*\n**\n***\n****\n*****',
      starterCode: `public class Main {
    public static void main(String[] args) {
        // 外层控制行，内层控制每行星号数

    }
}`,
      expectedOutput: '*\n**\n***\n****\n*****',
      answer: 'for (int i = 1; i <= 5; i++) { for (int j = 1; j <= i; j++) System.out.print("*"); System.out.println(""); }',
      explanation: '第 i 行打印 i 个星号，内层循环上界就是外层行号。print 不换行，println("") 换行。',
      hints: ['内层条件 j <= i', '每行结束用 System.out.println("") 换行'],
    },
    {
      id: 'java-e24', type: 'coding', title: '数组元素求平均并统计高于平均分人数', difficulty: 5, tags: ['数组', '算法'],
      question: '给定成绩数组 int[] scores = {78, 92, 65, 88, 54, 90}; 先求平均分（整数除法即可），再统计高于平均分的人数，输出两行：\navg = 77\nabove = 4',
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {78, 92, 65, 88, 54, 90};
        // 第一步：求总分与平均分

        // 第二步：统计高于平均分的人数

    }
}`,
      expectedOutput: 'avg = 77\nabove = 4',
      answer: 'sum 累加后 avg = sum / scores.length（整数除法 467/6=77）；再遍历比较 scores[i] > avg 计数。',
      explanation: '两遍遍历的经典统计题。注意整数除法截断：467/6=77；高于平均分是严格大于。',
      hints: ['int sum = 0; for 循环累加', 'int avg = sum / scores.length;', '第二遍 if (scores[i] > avg) count++;'],
    },
  ],
}
