import type { LanguagePack } from './types'

export const c: LanguagePack = {
  id: 'c',
  name: 'C',
  zhName: 'C 语言',
  color: '#a8b9cc',
  gradient: 'from-slate-400 to-cyan-600',
  icon: '🧱',
  tagline: '一切语言之母',
  description: '贴近硬件、极致高效的过程式语言，操作系统、嵌入式与编译器的基石。',
  playgroundTemplate: `#include <stdio.h>

int main() {
    printf("Hello, CodeMatrix!\\n");
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("1+2+...+100 = %d\\n", sum);
    return 0;
}`,
  chapters: [
    {
      id: 'c-ch1',
      title: '第 1 章 C 语言入门',
      intro: 'C 的历史地位、编译运行流程与程序基本结构。',
      sections: [
        {
          title: '1.1 为什么学 C',
          content: [
            'C 诞生于 1972 年（丹尼斯·里奇，贝尔实验室），为重写 UNIX 而设计。它是过程式语言的典范：程序 = 函数 + 数据结构。',
            'C 的特点：贴近硬件（可直接操作内存）、执行效率高、语法精炼（仅 32 个关键字）。操作系统内核、嵌入式设备、编译器大量用 C 编写。学懂 C，再学任何语言都会更快理解底层。',
            '编译流程：源文件 .c → 预处理 → 编译 → 汇编 → 链接 → 可执行文件。gcc main.c -o main 一条命令完成；分开写：gcc -c main.c 只编译，gcc main.o -o main 链接。',
            'C 标准演进：C89/C90（经典）、C99（变长数组、// 注释）、C11、C17。考试默认 C99 语法环境居多。',
          ],
          code: {
            lang: 'c',
            caption: '第一个 C 程序',
            source: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
          },
        },
        {
          title: '1.2 程序基本结构与 printf',
          content: [
            '#include <stdio.h> 把头文件内容原样插入，提供 printf/scanf 的声明。main 是程序入口，return 0 表示正常结束（返回非 0 表示异常）。',
            'printf 格式占位符：%d 整数、%ld 长整型、%f 浮点（%.2f 保留两位）、%c 字符、%s 字符串、%p 地址、%x 十六进制、%% 输出百分号本身。',
            'scanf("%d", &x) 必须传地址（& 取地址符），忘记 & 是最常见的新手错误，会导致程序崩溃。scanf 遇空格/回车结束当前项读取。',
            '注释：/* 多行注释 */（C89）与 // 单行注释（C99+）。注释不参与编译，但考试常考"注释能否嵌套"——/* */ 不能嵌套。',
          ],
        },
        {
          title: '1.3 标识符与关键字',
          content: [
            '32 个关键字分四类：类型（int char float double void 等）、控制（if else for while do switch case break continue goto return）、存储（auto static extern register const volatile）、其他（sizeof typedef struct union enum signed unsigned）。',
            '标识符规则：字母/数字/下划线，不能以数字开头，区分大小写（C 是大小写敏感语言），不能使用关键字。',
            '命名风格：C 社区惯用蛇形小写 student_name；常量宏全大写 MAX_SIZE。见名知意是工程素养。',
          ],
        },
      ],
      quiz: [
        {
          question: 'C 语言源程序的基本组成单位是？',
          options: ['A. 语句', 'B. 函数', 'C. 类', 'D. 模块'],
          answer: 'B',
          explanation: 'C 是过程式语言，程序由若干函数组成，main 是入口函数。',
        },
        {
          question: 'printf("%d", 65) 与 printf("%c", 65) 的输出分别是 ______。',
          answer: '65 和 A',
          explanation: '%d 按整数输出 65；%c 按 ASCII 字符输出，65 对应大写字母 A。',
        },
        {
          question: 'scanf("%d", x) 漏写了哪个运算符会导致程序出错？',
          options: ['A. *', 'B. &', 'C. #', 'D. %'],
          answer: 'B',
          explanation: 'scanf 需要变量的地址才能写入数据，必须写成 scanf("%d", &x)。',
        },
      ],
    },
    {
      id: 'c-ch2',
      title: '第 2 章 数据类型与运算符',
      intro: '整型浮点字符型、隐式转换、运算符优先级。',
      sections: [
        {
          title: '2.1 基本数据类型',
          content: [
            '整型：char(1 字节)、short(2)、int(4)、long、long long(8)，均有 signed/unsigned 之分。unsigned int 范围是 0~42 亿左右。',
            '浮点：float(4 字节，约 7 位有效数字)、double(8 字节，约 15 位)。浮点数不能精确表示 0.1，比较相等用 fabs(a-b) < 1e-6，绝不能用 ==。',
            '字符本质是整数（ASCII 码）：\'A\' 是 65，\'a\' 是 97（差 32 是大小写转换的钥匙），\'0\' 是 48（数字字符转数字：c - \'0\'）。',
            'C89 没有原生布尔类型（C99 提供 stdbool.h），用整数表示真假：0 为假，非 0 为真（-1 也是真！）。',
          ],
        },
        {
          title: '2.2 运算符与类型转换',
          content: [
            '整数除法截断：5 / 2 = 2；要得小数写 5 / 2.0 或 (double)5 / 2。% 只能用于整数，且结果符号与被除数一致（-7 % 2 = -1）。',
            '自增自减：i++ 先用后加。printf("%d %d", i, i++) 这类写法是未定义行为，不同编译器结果不同——考试可能考，工程禁止写。',
            '隐式转换向"高精度、大范围"看齐；强制转换 (int)3.9 得 3（截断非四舍五入）。赋值时右边类型自动转成左边类型。',
            '逻辑运算 && || ! 结果只有 0 或 1，且 && || 有短路特性：a && f() 中 a 为 0 时 f() 不执行——常用来防除零：if (b != 0 && a / b > 1)。',
            'sizeof 是编译期运算符不是函数；逗号表达式 (a, b, c) 的值是最后一个；条件表达式 max = a > b ? a : b。',
          ],
          code: {
            lang: 'c',
            source: `printf("%d\\n", 5 / 2);        // 2
printf("%.1f\\n", 5 / 2.0);    // 2.5
char c = 'A' + 1;
printf("%c %d\\n", c, c);      // B 66
printf("%d\\n", 5 > 3);        // 1`,
          },
        },
        {
          title: '2.3 运算符优先级速查',
          content: [
            '从高到低速记：括号 > 单目（! ~ ++ -- *取内容 &取地址 sizeof）> 算术（* / % 高于 + -）> 移位 > 关系（< <= > >= 高于 == !=）> 位运算（& ^ |）> 逻辑（&& 高于 ||）> 条件 ?: > 赋值 > 逗号。',
            '经典考题：!x == y 实际是 (!x) == y（! 优先级高于 ==）；a << 1 + 2 实际是 a << (1+2)（算术高于移位）。拿不准加括号。',
            '赋值表达式的值就是被赋的值：if ((c = getchar()) != EOF) 是标准输入循环惯用法。',
          ],
        },
      ],
      quiz: [
        {
          question: '表达式 5 / 2 * 2.0 的值是？',
          options: ['A. 5.0', 'B. 4.0', 'C. 4', 'D. 5'],
          answer: 'B',
          explanation: '从左到右：5/2 整数除法得 2，再 2*2.0 浮点乘法得 4.0。运算顺序决定一切。',
        },
        {
          question: '字符 \'0\' 与数字 0 的关系是？',
          answer: '\'0\' 的 ASCII 值是 48；字符数字 c 转对应数字用 c - \'0\'',
          explanation: '这是字符与数字互转的钥匙：\'5\' - \'0\' = 5，5 + \'0\' = \'5\'。',
        },
        {
          question: 'int a = 1, b = 0; 表达式 a || b++ 执行后 b 的值是？',
          options: ['A. 1', 'B. 0', 'C. 2', 'D. 未定义'],
          answer: 'B',
          explanation: 'a 为 1 使 || 短路，b++ 不执行，b 仍是 0——短路特性的标准考题。',
        },
        {
          question: '判断浮点数 a 是否等于 3.14 的正确写法是 ______。',
          answer: 'fabs(a - 3.14) < 1e-6（需要 math.h）',
          explanation: '浮点存储有精度误差，绝不能用 == 直接比较。',
        },
      ],
    },
    {
      id: 'c-ch3',
      title: '第 3 章 流程控制',
      intro: 'if/switch 分支、三种循环、break/continue/goto。',
      sections: [
        {
          title: '3.1 分支结构',
          content: [
            'if (x = 5) 是赋值不是比较，结果恒真且 x 被改写——C 语言最著名的陷阱，防御写法是 if (5 == x)（写反了编译器会报错）。',
            'switch 只接受整型/字符型表达式，case 后必须是常量表达式，break 缺失会穿透。多个 case 可以共用一段代码：case 1: case 2: ... 利用穿透实现。',
            'else 与最近的未配对 if 配对（悬垂 else 问题），必要时加大括号明确归属。',
            'if-else 链与 switch 的选型：范围判断用 if-else（switch 不支持区间），离散整数值用 switch 更清晰。',
          ],
        },
        {
          title: '3.2 循环结构',
          content: [
            'for (初始化; 条件; 更新) 三个部分都可省略，for(;;) 是死循环。while 先判后做，do-while 先做后判至少一次。',
            'break 只跳出最近一层循环；continue 跳过本次。goto 可跳到标签处，仅限跳出多层嵌套等特殊场景，滥用会造成"面条代码"。',
            '循环经典题：累加、阶乘、素数、最大公约数（辗转相除）、水仙花数、打印图形（菱形、三角形）。',
            '循环效率意识：内层循环放变化快的变量；能 break 就 break；循环不变量提到循环外计算。',
          ],
          code: {
            lang: 'c',
            caption: '辗转相除求最大公约数',
            source: `int a = 24, b = 18, t;
while (b != 0) {
    t = a % b;
    a = b;
    b = t;
}
printf("gcd = %d\\n", a);  // 6`,
          },
        },
        {
          title: '3.3 输入驱动的循环',
          content: [
            '读取不定数量数据的经典写法：while (scanf("%d", &x) == 1) { ... }——scanf 返回成功读取的项数，读到文件尾返回 EOF。',
            '多组测试数据（Online Judge 常见格式）：while (~scanf("%d", &n)) 或 while (scanf("%d", &n) != EOF)。',
            '字符逐个读取：while ((c = getchar()) != \'\\n\')——注意 c 要声明为 int 才能正确接收 EOF（-1）。',
          ],
        },
      ],
      quiz: [
        {
          question: 'if (a = 0) 的条件永远为 ______，因为 = 是赋值运算符。',
          answer: '假（0）',
          explanation: '赋值表达式的值是被赋的值 0，即假。想比较要用 ==。防御写法 if (0 == a)。',
        },
        {
          question: 'for 语句括号内的三个表达式用 ______ 分隔，都可以省略。',
          answer: '分号 ;',
          explanation: 'for(;;) 是合法的死循环写法，两个分号不可省。',
        },
        {
          question: 'while 与 do-while 的本质区别是？',
          options: ['A. 语法不同而已', 'B. do-while 至少执行一次循环体', 'C. while 更快', 'D. do-while 不能用 break'],
          answer: 'B',
          explanation: 'do-while 先执行后判断；while 先判断后执行，条件一开始为假则一次都不执行。',
        },
        {
          question: '用辗转相除法求 24 与 18 的最大公约数是 ______。',
          answer: '6',
          explanation: '24%18=6 → 18%6=0 → gcd 为 6。',
        },
      ],
    },
    {
      id: 'c-ch4',
      title: '第 4 章 数组与字符串',
      intro: '一维二维数组、字符数组与 string.h 函数族。',
      sections: [
        {
          title: '4.1 数组基础',
          content: [
            '定义 int a[5]; 长度必须是编译期常量（C99 支持变长数组 VLA）。初始化 int a[5] = {1, 2}; 其余自动补 0；int a[] = {1,2,3} 由初始化列表推断长度。',
            'C 不检查数组越界！a[5] 编译不报错，运行时读到垃圾值或崩溃——越界是 C 程序的头号 bug 来源，循环边界务必用 i < n。',
            '数组名作函数参数时退化为指针，函数内 sizeof 拿不到真实长度，必须额外传长度参数：void sort(int a[], int n)。',
            '二维数组 int m[3][4] 按行连续存储；初始化可以省略第一维 int m[][4] = {...}，第二维不可省（编译器要靠它计算地址偏移）。',
          ],
        },
        {
          title: '4.2 字符数组与字符串函数',
          content: [
            'C 字符串是 \\0 结尾的字符数组：char s[10] = "abc"; 实际占 4 字节（含 \\0）。char s[] = {\'a\',\'b\',\'c\'} 没有 \\0，不是合法字符串，用 %s 输出会越界乱码。',
            'string.h 四剑客：strlen（长度，不含 \\0）、strcpy（拷贝）、strcat（拼接）、strcmp（比较，返回 <0/0/>0）。strcmp(a,b)==0 才表示相等，不能直接 if (a == b)（那是比地址）。',
            'sizeof 与 strlen 的区别是经典考点：sizeof(s) 是数组总容量（含 \\0 与空余），strlen(s) 是实际字符数。char s[10]="abc" → sizeof=10，strlen=3。',
            '安全版本函数：strncpy/strncat/fgets 带长度上限，避免缓冲区溢出。gets 永远不要用（C11 已删除）。',
          ],
          code: {
            lang: 'c',
            source: `char s[20] = "Hello";
printf("%zu %zu\\n", sizeof(s), strlen(s));  // 20 5
strcat(s, " C");
if (strcmp(s, "Hello C") == 0)
    printf("相等: %s\\n", s);`,
          },
        },
        {
          title: '4.3 数组经典算法',
          content: [
            '排序：冒泡（相邻交换 n-1 轮）、选择（每轮选最小放前面）——两个模板必须默写得出。',
            '查找：顺序查找 O(n)；二分查找 O(log n) 要求有序，三要素 low/high/mid，边界更新 low = mid + 1 / high = mid - 1。',
            '逆置：双指针首尾相向交换，i < j 停止。删除元素：后续元素前移，长度减一。插入元素：先腾位再放值。',
            '统计与映射：用数组当下标桶 cnt[x]++ 统计频次，是"哈希思想"的数组版。',
          ],
        },
      ],
      quiz: [
        {
          question: 'char s[10] = "abc"; sizeof(s) 与 strlen(s) 分别是？',
          options: ['A. 3 和 3', 'B. 10 和 3', 'C. 4 和 3', 'D. 10 和 4'],
          answer: 'B',
          explanation: 'sizeof 看声明容量 10；strlen 数到 \\0 为止（不含 \\0）为 3。',
        },
        {
          question: '比较两个 C 字符串内容是否相等，正确写法是 ______。',
          answer: 'strcmp(a, b) == 0',
          explanation: '== 比较的是两个数组的首地址，永远不相等；strcmp 返回 0 表示内容相同。',
        },
        {
          question: '函数 void f(int a[]) 内 sizeof(a) 在 64 位系统的值是？',
          options: ['A. 数组总字节数', 'B. 8', 'C. 4', 'D. 元素个数'],
          answer: 'B',
          explanation: '数组作参数退化为指针，sizeof 得到指针本身大小 8 字节，所以长度必须额外传参。',
        },
        {
          question: '二分查找的前提条件是 ______。',
          answer: '数组必须有序',
          explanation: '无序数组只能顺序查找。二分每次排除一半，前提是"中间值能告诉你目标在哪边"。',
        },
      ],
    },
    {
      id: 'c-ch5',
      title: '第 5 章 函数与指针',
      intro: '函数定义与声明、指针运算、指针与数组函数的关系。',
      sections: [
        {
          title: '5.1 函数基础',
          content: [
            '函数先声明后使用（原型：int add(int, int);）。定义在调用之后时必须提前声明，否则编译警告/报错。声明与定义分离是 C 工程组织的基础（.h 放声明，.c 放定义）。',
            'C 只有值传递：形参是实参的副本。想让函数修改外部变量，必须传地址（指针）：void f(int* p) { *p = 10; }。',
            '全局变量整个程序可见；局部变量随函数调用生灭；static 局部变量只初始化一次，值跨调用保留（计数器神器）。',
            '递归函数 = 递推关系 + 终止条件。经典：阶乘、斐波那契、汉诺塔。递归的代价是栈空间，深度过大导致栈溢出（Stack Overflow 网站名字的由来）。',
          ],
        },
        {
          title: '5.2 指针——C 语言的灵魂',
          content: [
            'int* p = &a; p 存地址，*p 取内容。p + 1 移动 sizeof(int) 字节。指针类型决定解引用时读多少字节、步进多少字节。',
            '指针与数组：a[i] ≡ *(a+i) ≡ p[i] ≡ *(p+i)。数组名是常量指针，不能 a++，但 p 可以 p++。',
            '二级指针 int** pp = &p; 用于函数内修改指针本身（如动态分配后带回）。函数指针 int (*fp)(int,int) 可实现回调与"策略模式"。',
            'malloc/free 动态内存：int* p = (int*)malloc(n * sizeof(int)); 用完 free(p); p = NULL; 防泄漏防悬垂。malloc 在 stdlib.h，失败返回 NULL 要检查。',
          ],
          code: {
            lang: 'c',
            caption: '指针实现交换',
            source: `void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}
int main() {
    int x = 3, y = 5;
    swap(&x, &y);
    printf("%d %d\\n", x, y);  // 5 3
    return 0;
}`,
          },
        },
        {
          title: '5.3 指针进阶与常见错误',
          content: [
            '指针数组 char* days[] = {"Mon", "Tue"}（数组元素是字符串指针）vs 数组指针 char (*p)[10]（指向整个数组）——读法：从标识符出发，[] 优先于 *。',
            '三大禁忌：返回局部变量的地址（函数结束即销毁）；free 后继续访问（悬垂指针）；malloc 后忘记 free（内存泄漏）。',
            'const 与指针：const char* p（内容只读）、char* const p（指针只读）。字符串字面量 "abc" 存于只读区，char* s = "abc"; s[0] = \'x\'; 会崩溃！',
          ],
        },
      ],
      quiz: [
        {
          question: 'void f(int x) { x = 10; } 调用后实参不变，而 void g(int* x) { *x = 10; } 能改变实参，因为？',
          options: ['A. g 用了特殊语法', 'B. C 只有值传递，g 传的是地址副本，通过地址找到并修改了原变量', 'C. f 写错了', 'D. 指针传递是引用传递'],
          answer: 'B',
          explanation: '两种都是值传递！区别在于传的是数值还是地址值——拿到地址就能修改目标内存。',
        },
        {
          question: 'int a[5] = {1,2,3,4,5}; int* p = a; *(p + 2) 的值是 ______。',
          answer: '3',
          explanation: 'p+2 指向 a[2]，解引用得 3。四种等价写法：a[2]、*(a+2)、p[2]、*(p+2)。',
        },
        {
          question: '函数返回局部变量的地址会导致什么后果？',
          answer: '悬垂指针：函数结束后局部变量被销毁，返回的地址指向无效内存',
          explanation: '想要"返回"数据应使用 static 局部变量、堆内存（malloc）或调用方传入的缓冲区。',
        },
        {
          question: 'static 局部变量与普通局部变量的区别是 ______。',
          answer: 'static 只初始化一次且值在多次调用间保留；普通局部变量每次调用重新创建',
          explanation: 'static int n = 0; 的初始化只执行一次，生命周期贯穿整个程序。',
        },
      ],
    },
    {
      id: 'c-ch6',
      title: '第 6 章 结构体、文件与预处理',
      intro: 'struct/union/enum、typedef、文件读写与宏。',
      sections: [
        {
          title: '6.1 结构体',
          content: [
            'struct Student { char name[20]; int age; }; 把不同类型的数据打包。访问成员：变量用 .，指针用 ->（p->age ≡ (*p).age）。',
            '结构体可整体赋值（s2 = s1，逐成员拷贝），但不能用 == 整体比较。作函数参数是整体拷贝（大结构体应传指针）。',
            'typedef 起别名：typedef struct Student Stu; 之后 Stu s; 即可。链表节点 struct Node { int data; struct Node* next; }; 是结构体+指针的综合应用。',
            '内存对齐：结构体大小往往不是成员之和（对齐填充），sizeof 结果常是 4/8 的倍数——面试高频，考试了解概念即可。',
          ],
        },
        {
          title: '6.2 链表基础',
          content: [
            '链表是动态数据结构：节点用 malloc 创建，通过 next 指针串联。头指针 head 是整条链的入口，丢失 head 等于丢失整条链。',
            '头插法两行：newNode->next = head; head = newNode; 顺序不能反（先接后指，否则链条丢失）。',
            '遍历：for (Node* p = head; p != NULL; p = p->next)。删除节点：先让前驱跳过它 prev->next = cur->next; 再 free(cur)。',
          ],
        },
        {
          title: '6.3 文件操作与预处理',
          content: [
            '文件操作四步：fopen("a.txt", "r") 打开（模式 r 读 / w 写覆盖 / a 追加，加 b 二进制）→ fscanf/fprintf 或 fgets/fputs 读写 → fclose 关闭。fopen 失败返回 NULL 必须检查。',
            '预处理指令：#include（嵌入文件）、#define PI 3.14（宏替换，不做运算）、带参宏 #define SQ(x) ((x)*(x)) 每个参数都要加括号防优先级错误。',
            '条件编译 #ifdef / #ifndef / #endif 防止头文件重复包含（include guard），是大型项目的标配写法。',
          ],
          code: {
            lang: 'c',
            caption: '带参宏的陷阱',
            source: `#define SQ(x) ((x) * (x))
printf("%d\\n", SQ(3 + 1));  // ((3+1)*(3+1)) = 16
// 若写成 #define SQ(x) x * x 则 3+1*3+1 = 7，出错`,
          },
        },
      ],
      quiz: [
        {
          question: 'struct 指针访问成员用 ______ 运算符，等价于 (*p).成员。',
          answer: '->',
          explanation: 'p->age 是 (*p).age 的语法糖，优先级括号不能省（. 高于 *）。',
        },
        {
          question: '链表头部插入新节点 newNode 的正确语句顺序是？',
          options: [
            'A. head = newNode; newNode->next = head;',
            'B. newNode->next = head; head = newNode;',
            'C. 两种都可以',
            'D. newNode = head; head->next = newNode;',
          ],
          answer: 'B',
          explanation: '先让新节点指向原头（保住链条），再更新 head。A 写法会先丢失整条链。',
        },
        {
          question: '#define SQ(x) x * x，则 SQ(2 + 3) 展开后的结果是 ______。',
          answer: '11（展开为 2 + 3 * 2 + 3）',
          explanation: '宏是纯文本替换不做运算，参数必须加括号：#define SQ(x) ((x) * (x))。',
        },
      ],
    },
    {
      id: 'c-ch7',
      title: '第 7 章 指针进阶',
      intro: '基础指针只是入场券。本章进入深水区：指针数组与数组指针的一字之差、二级指针、以及让 C 拥有"回调"能力的函数指针——学完才算真正摸到了 C 的灵魂。',
      sections: [
        {
          title: '7.1 指针数组与数组指针',
          content: [
            '`指针数组` int *arr[5]：数组里装着 5 个 int* 指针。最典型用途是字符串表：char *days[] = {"Mon", "Tue", ...}，每个元素指向一个字符串常量。',
            '`数组指针` int (*p)[5]：指向"一个含 5 个 int 的数组"的指针，p + 1 会跳过整个数组（20 字节）。二维数组传参时常见它的身影。',
            '区分口诀：[] 优先级高于 *，int *arr[5] 中 arr 先和 [5] 结合→数组；int (*p)[5] 中括号强行让 p 先和 * 结合→指针。',
            'main 的参数 int main(int argc, char *argv[]) 里，argv 就是指针数组：argv[0] 是程序名，argv[1] 起是命令行参数。',
          ],
          code: {
            lang: 'c',
            caption: '指针数组与数组指针对照',
            source: `#include <stdio.h>
int main() {
    // 指针数组：每个元素是 char*
    char *days[] = {"Mon", "Tue", "Wed"};
    printf("%s\\n", days[1]);        // Tue

    // 数组指针：指向整个 int[3]
    int a[3] = {1, 2, 3};
    int (*p)[3] = &a;
    printf("%d\\n", (*p)[2]);        // 3
    return 0;
}`,
          },
        },
        {
          title: '7.2 二级指针',
          content: [
            '`二级指针` int **pp 存的是"指针变量的地址"。*pp 得到那个指针，**pp 才得到最终的值。',
            '经典用途一：函数里修改调用者的指针。比如分配内存的函数 void myAlloc(int **pp) { *pp = malloc(sizeof(int)); }，调用处传 &p。',
            '经典用途二：处理指针数组。char **argv 遍历字符串表时，++argv 就走到下一个字符串。',
            '内存模型要刻进脑子：pp → p → a，是一条两级跳转链。画箭头图永远比空想可靠。',
          ],
          code: {
            lang: 'c',
            caption: '二级指针修改调用者的指针',
            source: `#include <stdio.h>
#include <stdlib.h>

void alloc42(int **pp) {
    *pp = malloc(sizeof(int));
    **pp = 42;
}

int main() {
    int *p = NULL;
    alloc42(&p);          // 传指针的地址
    printf("%d\\n", *p);  // 42
    free(p);
    return 0;
}`,
          },
        },
        {
          title: '7.3 函数指针与 qsort',
          content: [
            '函数名就是函数的地址：int (*fp)(int, int) = max; 之后 fp(3, 5) 等价于 max(3, 5)。',
            '函数指针让 C 也能"把函数当参数传"，标准库 qsort 就是典范：你传一个比较函数，它负责排序，排什么类型都行。',
            'qsort 原型：qsort(数组, 元素个数, 元素大小, 比较函数)。比较函数接收两个 const void*，返回负数/0/正数表示小于/等于/大于。',
            '比较函数里要先把 void* 转回真实类型：int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }（升序）。',
          ],
          code: {
            lang: 'c',
            caption: 'qsort + 函数指针排序',
            source: `#include <stdio.h>
#include <stdlib.h>

int cmpAsc(const void *a, const void *b) {
    return *(const int*)a - *(const int*)b;  // 升序
}

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    qsort(arr, 5, sizeof(int), cmpAsc);
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    // 1 2 5 8 9
    return 0;
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'char *days[] = {"Mon", "Tue"}; 中 days[1] 的类型是？',
          options: ['A. char', 'B. char*', 'C. char**', 'D. 数组'],
          answer: 'B',
          explanation: 'days 是指针数组，每个元素是 char*，指向一个字符串常量的首字符。',
        },
        {
          question: '函数想修改调用者的 int* 指针本身，参数应该写成？',
          answer: 'int **pp（二级指针），函数内用 *pp = ... 修改',
          explanation: 'C 只有值传递：要改什么就传什么的地址。改 int 传 int*，改 int* 就传 int**。',
        },
        {
          question: 'qsort 的比较函数返回负数表示什么含义？',
          answer: '第一个参数指向的元素应排在第二个之前（升序时即前者更小）',
          explanation: '约定：负=前小后大，0=相等，正=前大后小。返回 *(int*)a - *(int*)b 就是升序排列。',
        },
      ],
    },
    {
      id: 'c-ch8',
      title: '第 8 章 枚举、位运算与多文件工程',
      intro: '最后一章补齐 C 程序员的工程素养：用枚举告别魔法数字，用位运算触摸二进制世界，用多文件编译组织真正的项目。',
      sections: [
        {
          title: '8.1 枚举与 typedef',
          content: [
            '`枚举` enum 把一组相关常量打包命名：enum Color { RED, GREEN, BLUE };，RED=0、GREEN=1、BLUE=2 自动递增，也可以手动指定值。',
            '枚举的价值是可读性：if (status == RED) 比 if (status == 0) 清楚一百倍。这种裸数字被称为"魔法数字"，是坏代码的标志。',
            '`typedef` 给类型起别名：typedef unsigned int uint; 之后 uint x; 等价于 unsigned int x;。它也能简化结构体：typedef struct { ... } Point;。',
            '注意 typedef 不是新类型，只是别名——uint 和 unsigned int 完全等价，可以混用。',
          ],
          code: {
            lang: 'c',
            caption: '枚举与 typedef',
            source: `#include <stdio.h>

enum Weekday { MON = 1, TUE, WED, THU, FRI, SAT, SUN };

typedef struct {
    int x, y;
} Point;

int main() {
    enum Weekday today = WED;   // 值为 3
    printf("%d\\n", today);
    Point p = {3, 4};           // 不用写 struct
    printf("(%d, %d)\\n", p.x, p.y);
    return 0;
}`,
          },
        },
        {
          title: '8.2 位运算实战',
          content: [
            '六个位运算符：& 与、| 或、^ 异或、~ 取反、<< 左移、>> 右移。它们直接操作二进制位，速度极快。',
            '三大经典技巧：n & 1 判奇偶（结果为 1 是奇数）；n << 1 等于乘 2、n >> 1 等于除以 2；a ^ a = 0、0 ^ x = x 用于"找只出现一次的数"。',
            '掩码操作：flags | MASK 置位，flags & ~MASK 清零，flags ^ MASK 翻转。权限系统、硬件寄存器都这么玩。',
            '交换两个数不用临时变量：a ^= b; b ^= a; a ^= b;——面试常客，异或的自反性魔术。',
          ],
          code: {
            lang: 'c',
            caption: '位运算三板斧',
            source: `#include <stdio.h>
int main() {
    int n = 12;                 // 二进制 1100
    printf("%d\\n", n & 1);     // 0，偶数
    printf("%d\\n", n << 1);    // 24，左移乘 2
    printf("%d\\n", n >> 2);    // 3，右移除 4

    int a = 5, b = 9;
    a ^= b; b ^= a; a ^= b;     // 异或交换
    printf("a=%d b=%d\\n", a, b); // a=9 b=5
    return 0;
}`,
          },
        },
        {
          title: '8.3 多文件编译与工程组织',
          content: [
            '真实项目不会只有一个 .c 文件。规范做法：.h 头文件放声明（函数原型、结构体、宏），.c 源文件放实现，谁要用就 #include "xxx.h"。',
            '编译多文件：gcc main.c utils.c -o app 一起编译链接；或先分别编译成 .o 再链接——大项目只重编译改动的文件，节省时间。',
            '头文件卫士（#ifndef MY_H / #define MY_H / #endif）防止同一头文件被重复包含导致"重复定义"错误，每个 .h 都要写。',
            'extern 关键字声明"这个变量在别的文件里定义"，是跨文件共享全局变量的方式（但全局变量能不用就不用）。',
          ],
          code: {
            lang: 'c',
            caption: '一个最小多文件工程',
            source: `/* utils.h —— 只放声明 */
#ifndef UTILS_H
#define UTILS_H
int add(int a, int b);
#endif

/* utils.c —— 实现 */
#include "utils.h"
int add(int a, int b) { return a + b; }

/* main.c —— 使用 */
#include <stdio.h>
#include "utils.h"
int main() { printf("%d\\n", add(2, 3)); return 0; }

/* 编译：gcc main.c utils.c -o app */`,
          },
        },
      ],
      quiz: [
        {
          question: 'enum Color { RED, GREEN = 5, BLUE }; 中 BLUE 的值是？',
          options: ['A. 2', 'B. 5', 'C. 6', 'D. 0'],
          answer: 'C',
          explanation: '枚举值默认从 0 递增，但手动指定后，后面的成员在此基础上继续递增：GREEN=5，BLUE=6。',
        },
        {
          question: '不使用临时变量交换 a、b 两个变量的值，位运算写法是？',
          answer: 'a ^= b; b ^= a; a ^= b;',
          explanation: '利用异或自反性：x ^ x = 0，0 ^ x = x。三步之后 a、b 完成交换。',
        },
        {
          question: '头文件卫士 #ifndef / #define / #endif 解决什么问题？',
          answer: '防止同一头文件被多次 #include 造成类型或函数重复定义的编译错误',
          explanation: '第一次包含时宏未定义→定义宏并包含内容；再次包含时宏已存在→整段被跳过。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'c-p1',
      title: '读程序写结果：指针与数组等价性',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        'C 语言读程序题一半是指针题。牢记四种等价写法：a[i]、*(a+i)、p[i]、*(p+i)，再把指针移动一步步画出来。',
        '特别注意 p++ 后旧位置与新位置分别参与了哪次运算。',
      ],
      keyPoints: ['数组名即首地址', '指针步进按类型', '*p++ = *(p++)', '越界是未定义行为'],
      example: {
        question: 'int a[] = {1,2,3,4}; int* p = a; printf("%d %d ", *p, *(p+2)); p++; printf("%d", *p);',
        answer: '1 3 2',
        explanation: '第一次 printf 输出 *p（a[0]=1）与 *(p+2)（a[2]=3）；随后 p++ 使 p 指向 a[1]，最后输出 2。',
      },
      traps: ['把 *(p+2) 算成 *p + 2', 'p++ 的时机弄错', 'printf 多参数求值顺序不可依赖'],
    },
    {
      id: 'c-p2',
      title: '程序改错：scanf 与字符串安全',
      category: '程序改错',
      difficulty: 2,
      analysis: [
        '改错题高频三坑：scanf 漏 &、数组越界、字符串忘记 \\0。先找输入函数，再找下标边界，最后找字符串结尾。',
        'scanf 读入字符前残留的回车要用 getchar() 或格式串前加空格吃掉。',
      ],
      keyPoints: ['scanf 需要地址', 'gets 危险禁用', 'strcpy 不检查长度', '循环边界 off-by-one'],
      example: {
        question: '改错：int x; scanf("%d", x);',
        answer: 'scanf("%d", &x);',
        explanation: 'scanf 需要变量的地址以便写入，传值会把 x 的内容当地址使用，导致崩溃或乱写内存。',
      },
      traps: ['printf 不需要 & 而 scanf 需要，二者混淆', 'char 数组用 %s 输入超过容量', '混用 scanf 与 gets 导致回车残留'],
    },
    {
      id: 'c-p3',
      title: '选择题：sizeof 与 strlen',
      category: '选择题',
      difficulty: 3,
      analysis: [
        'sizeof 是编译期运算符，给出类型/数组占的字节数；strlen 是运行时函数，数到 \\0 为止（不含 \\0）。',
        '对指针做 sizeof 得到的是指针本身大小（64 位系统 8 字节），与所指内容无关。',
      ],
      keyPoints: ['sizeof 数组含 \\0 与容量', 'strlen 不含 \\0', 'sizeof 指针 = 8（64 位）', '数组传参退化为指针'],
      example: {
        question: 'char s[10] = "abc"; sizeof(s) 与 strlen(s) 分别是？',
        answer: '10 和 3',
        explanation: 'sizeof 看声明容量 10；strlen 数 a、b、c 三个字符到 \\0 停止。',
      },
      traps: ['以为 sizeof 是实际长度', 'char* p = "abc"; sizeof(p) 误答 4', 'strlen 遇不到 \\0 会越界乱数'],
    },
    {
      id: 'c-p4',
      title: '编程题：数组算法（排序/查找/逆置）',
      category: '编程题',
      difficulty: 3,
      analysis: [
        'C 语言没有 STL，一切手写。必备模板：冒泡、选择、二分、逆置、插入。写完后用 3 个元素的数组手工验证边界。',
        '函数封装规范：void bubble(int a[], int n)，长度必须作参数传入。',
      ],
      keyPoints: ['冒泡 n-1 轮', '二分要求有序', '逆置双指针', '函数参数传长度'],
      example: {
        question: '将数组 {1,2,3,4,5} 原地逆置并输出。',
        code: `int a[] = {1, 2, 3, 4, 5};
int n = 5;
for (int i = 0, j = n - 1; i < j; i++, j--) {
    int t = a[i]; a[i] = a[j]; a[j] = t;
}
for (int i = 0; i < n; i++) printf("%d ", a[i]);  // 5 4 3 2 1`,
        answer: '5 4 3 2 1',
        explanation: '双指针首尾相向交换，i < j 时停止，奇偶长度都正确。',
      },
      traps: ['交换条件写成 i <= j 导致又换回来', '临时变量缺失', 'for 中更新两个下标的逗号写法不熟'],
    },
    {
      id: 'c-p5',
      title: '读程序写结果：递归调用',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        '递归题画调用树：每次调用展开一层，标出参数与返回值，从最深层开始回填。',
        '注意 printf 在递归调用前（先输出再深入）还是之后（回溯时输出，顺序相反）。',
      ],
      keyPoints: ['调用树', '终止条件', '输出语句的位置决定顺序', '栈帧独立（每层变量各有一份）'],
      example: {
        question: 'void f(int n) { if (n > 0) { printf("%d", n); f(n - 1); printf("%d", n); } }，调用 f(3) 输出什么？',
        answer: '321123',
        explanation: '深入时依次打印 3、2、1；触底返回时回溯打印 1、2、3。前序输出 + 回溯输出对称。',
      },
      traps: ['忘记回溯阶段还会执行 printf', '每层 n 是独立副本', '缺终止条件导致无限递归栈溢出'],
    },
    {
      id: 'c-p6',
      title: '程序填空：结构体与链表',
      category: '程序填空',
      difficulty: 5,
      analysis: [
        '链表填空围绕三个操作：插入（断两链接两链）、删除（跳过目标节点再 free）、遍历（p = p->next 直到 NULL）。',
        '画图是王道：画出节点方块与指针箭头，再决定每条赋值语句的先后——先接后断，防止链条丢失。',
      ],
      keyPoints: ['malloc 申请节点', 'p->next 指针移动', '头插法/尾插法', '删除要 free'],
      example: {
        question: '在 head 指向的单链表头部插入新节点 newNode，补全两行代码。',
        answer: 'newNode->next = head; head = newNode;',
        explanation: '先让新节点指向原头节点，再把 head 更新为新节点。顺序颠倒会丢失整条链。',
      },
      traps: ['两句顺序写反', '忘记 malloc', '遍历时把 head 直接后移丢失表头'],
    },
  ],
  exercises: [
    {
      id: 'c-e1', type: 'choice', title: 'printf 格式符', difficulty: 1, tags: ['入门'],
      question: 'printf("%.2f", 3.14159); 的输出是？',
      options: ['A. 3.14', 'B. 3.14159', 'C. 3.15', 'D. 3.1'],
      answer: 'A',
      explanation: '%.2f 保留两位小数并四舍五入，3.14159 → 3.14。',
    },
    {
      id: 'c-e2', type: 'choice', title: '字符与 ASCII', difficulty: 2, tags: ['数据类型'],
      question: 'char c = \'A\' + 2; printf("%c", c); 输出是？',
      options: ['A. A', 'B. B', 'C. C', 'D. 67'],
      answer: 'C',
      explanation: '\'A\' 的 ASCII 是 65，加 2 得 67，%c 按字符输出为 C。',
    },
    {
      id: 'c-e3', type: 'choice', title: 'sizeof 辨析', difficulty: 3, tags: ['数组'],
      question: 'char s[10] = "abc"; 则 sizeof(s) 和 strlen(s) 的值分别为？',
      options: ['A. 3 和 3', 'B. 10 和 3', 'C. 4 和 3', 'D. 10 和 4'],
      answer: 'B',
      explanation: 'sizeof 返回数组容量 10；strlen 数到 \\0 为止（不含 \\0）为 3。',
    },
    {
      id: 'c-e4', type: 'choice', title: '指针基础', difficulty: 3, tags: ['指针'],
      question: 'int a = 5; int* p = &a; *p = 8; printf("%d", a); 输出是？',
      options: ['A. 5', 'B. 8', 'C. 地址', 'D. 编译错误'],
      answer: 'B',
      explanation: '*p 就是 a 本身，通过指针修改直接作用于 a。',
    },
    {
      id: 'c-e5', type: 'choice', title: 'static 局部变量', difficulty: 4, tags: ['函数'],
      question: 'void f() { static int n = 0; n++; printf("%d", n); } 连续调用 f(); f(); f(); 输出是？',
      options: ['A. 111', 'B. 123', 'C. 000', 'D. 333'],
      answer: 'B',
      explanation: 'static 局部变量只初始化一次，值在多次调用间保留：1、2、3。',
    },
    {
      id: 'c-e6', type: 'fill', title: '补全交换函数', difficulty: 3, tags: ['指针', '函数'],
      question: '补全：void swap(int* a, int* b) { int t = *a; *a = *b; ______ = t; } 调用方式 swap(&x, &y);',
      answer: '*b',
      explanation: '通过解引用把临时值写回 b 所指的变量，完成交换。',
    },
    {
      id: 'c-e7', type: 'fill', title: '宏定义陷阱', difficulty: 3, tags: ['预处理'],
      question: '#define SQ(x) ((x) * (x))，则 SQ(2 + 3) 的值为 ______。',
      answer: '25',
      explanation: '展开为 ((2 + 3) * (2 + 3)) = 25。若宏不带括号会展开成 2 + 3 * 2 + 3 = 11。',
    },
    {
      id: 'c-e8', type: 'coding', title: 'Hello C 与累加', difficulty: 1, tags: ['入门'],
      question: '第一行输出 "Hello C"，第二行输出 1 到 100 的和，格式 "sum = 5050"。',
      starterCode: `#include <stdio.h>

int main() {
    /* 在这里编写代码 */

    return 0;
}`,
      expectedOutput: 'Hello C\nsum = 5050',
      answer: 'printf("Hello C\\n"); 配合 for 循环累加，printf("sum = %d\\n", sum);',
      explanation: '熟悉 stdio.h 输出与 for 循环。',
      hints: ['%d 输出整数', '\\n 换行'],
    },
    {
      id: 'c-e9', type: 'coding', title: '判断闰年', difficulty: 2, tags: ['分支'],
      question: '判断 2024 年是否为闰年，输出 "2024 是闰年" 或 "2024 不是闰年"。闰年规则：能被 4 整除但不能被 100 整除，或能被 400 整除。',
      starterCode: `#include <stdio.h>

int main() {
    int year = 2024;
    /* 判断闰年 */

    return 0;
}`,
      expectedOutput: '2024 是闰年',
      answer: 'if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)',
      explanation: '闰年条件组合：普通年看 4，整百年看 400。2024 能被 4 整除且非整百，是闰年。',
      hints: ['&& 与 || 组合', '注意运算符优先级，&& 高于 ||'],
    },
    {
      id: 'c-e10', type: 'coding', title: '数组逆置输出', difficulty: 3, tags: ['数组'],
      question: '将数组 {1, 2, 3, 4, 5} 逆置后输出一行，空格分隔："5 4 3 2 1"（行尾不留空格）。',
      starterCode: `#include <stdio.h>

int main() {
    int a[] = {1, 2, 3, 4, 5};
    int n = 5;
    /* 双指针逆置 */

    /* 输出 */

    return 0;
}`,
      expectedOutput: '5 4 3 2 1',
      answer: 'for (i=0, j=n-1; i<j; i++, j--) 交换 a[i] 与 a[j]；输出时首个不带空格。',
      explanation: '双指针相向而行，i < j 停止。',
      hints: ['int t = a[i]; a[i] = a[j]; a[j] = t;', 'if (i > 0) printf(" "); 再 printf("%d", a[i]);'],
    },
    {
      id: 'c-e11', type: 'coding', title: '递归求阶乘', difficulty: 3, tags: ['递归', '函数'],
      question: '用递归函数计算 5 的阶乘并输出 "5! = 120"。',
      starterCode: `#include <stdio.h>

int factorial(int n) {
    /* 递归实现 */

}

int main() {
    printf("5! = %d\\n", factorial(5));
    return 0;
}`,
      expectedOutput: '5! = 120',
      answer: 'if (n <= 1) return 1; return n * factorial(n - 1);',
      explanation: '递归 = 终止条件（n<=1 返回 1）+ 递推式（n * f(n-1)）。',
      hints: ['终止条件不能少', '每次问题规模减 1'],
    },
    {
      id: 'c-e12', type: 'coding', title: '统计字符串中大写字母', difficulty: 4, tags: ['字符串'],
      question: '统计字符串 "Hello World C" 中大写字母的个数，输出 "upper = 3"。不使用 ctype.h。',
      starterCode: `#include <stdio.h>

int main() {
    char s[] = "Hello World C";
    int count = 0;
    /* 遍历统计 */

    printf("upper = %d\\n", count);
    return 0;
}`,
      expectedOutput: 'upper = 3',
      answer: 'for (int i = 0; s[i] != \'\\0\'; i++) if (s[i] >= \'A\' && s[i] <= \'Z\') count++;',
      explanation: '字符比较本质是 ASCII 比较；循环到 \\0 结束。H、W、C 三个大写。',
      hints: ['s[i] != \'\\0\' 作为循环条件', '范围判断 s[i] >= \'A\' && s[i] <= \'Z\''],
    },
    {
      id: 'c-e13', type: 'choice', title: '逗号表达式', difficulty: 3, tags: ['运算符'],
      question: 'int x = (1, 2, 3); 则 x 的值是？',
      options: ['A. 1', 'B. 2', 'C. 3', 'D. 编译错误'],
      answer: 'C',
      explanation: '逗号表达式从左到右依次求值，整个表达式的值是最后一个：3。',
    },
    {
      id: 'c-e14', type: 'choice', title: '指针数组 vs 数组指针', difficulty: 5, tags: ['指针'],
      question: 'int* p[5] 与 int (*q)[5] 的区别是？',
      options: [
        'A. 完全一样',
        'B. p 是含 5 个指针的数组；q 是指向含 5 个 int 数组的指针',
        'C. p 是指针；q 是数组',
        'D. 都是函数指针',
      ],
      answer: 'B',
      explanation: '[] 优先级高于 *：int* p[5] 是指针数组；括号使 int (*q)[5] 成为数组指针。经典辨析题。',
    },
    {
      id: 'c-e15', type: 'choice', title: '字符串字面量只读', difficulty: 5, tags: ['指针', '字符串'],
      question: 'char* s = "hello"; s[0] = \'H\'; 这行代码会？',
      options: [
        'A. 正常修改为 "Hello"',
        'B. 未定义行为（通常崩溃）',
        'C. 编译错误',
        'D. 只在某些机器出错，可忽略',
      ],
      answer: 'B',
      explanation: '字符串字面量存于只读区，试图修改是未定义行为。正确做法：char s[] = "hello";（栈上数组可修改）。',
    },
    {
      id: 'c-e16', type: 'choice', title: '递归输出顺序', difficulty: 4, tags: ['递归'],
      question: 'void f(int n){ if(n>0){ f(n-1); printf("%d", n); } } 调用 f(3) 输出？',
      options: ['A. 321', 'B. 123', 'C. 321123', 'D. 333'],
      answer: 'B',
      explanation: 'printf 在递归调用之后：先一路深入到 n=0，回溯时依次输出 1、2、3。',
    },
    {
      id: 'c-e17', type: 'choice', title: '结构体内存对齐', difficulty: 5, tags: ['结构体'],
      question: 'struct { char a; int b; char c; } 在 4 字节对齐下 sizeof 通常是？',
      options: ['A. 6', 'B. 8', 'C. 12', 'D. 9'],
      answer: 'C',
      explanation: 'char a 占 1 后补 3，int b 占 4，char c 占 1 后整体补齐到 4 的倍数：1+3+4+1+3=12。对齐是面试高频。',
    },
    {
      id: 'c-e18', type: 'choice', title: 'do-while 执行次数', difficulty: 3, tags: ['循环'],
      question: 'int i = 10; do { printf("%d ", i); i++; } while (i < 5); 输出是？',
      options: ['A. 无输出', 'B. 10', 'C. 10 11 12 13 14', 'D. 死循环'],
      answer: 'B',
      explanation: 'do-while 先执行后判断：输出 10 后 i=11，条件 11<5 为假退出。',
    },
    {
      id: 'c-e19', type: 'fill', title: '补全二分查找', difficulty: 4, tags: ['算法'],
      question: 'while (low <= high) { int mid = (low + high) / 2; if (a[mid] == key) return mid; else if (a[mid] < key) low = ______; else high = mid - 1; }',
      answer: 'mid + 1',
      explanation: 'a[mid] < key 目标在右半区，low 收紧到 mid+1（mid 已排除）。',
    },
    {
      id: 'c-e20', type: 'fill', title: '补全链表遍历', difficulty: 4, tags: ['链表', '结构体'],
      question: '遍历单链表打印每个节点：for (Node* p = head; p != NULL; ______) { printf("%d ", p->data); }',
      answer: 'p = p->next',
      explanation: '每次循环把 p 移动到下一个节点，直到 NULL 结束。忘记这句就是死循环。',
    },
    {
      id: 'c-e21', type: 'fill', title: '补全字符串拷贝', difficulty: 4, tags: ['字符串', '指针'],
      question: '手写 strcpy：void mycpy(char* dst, const char* src) { while ((*dst++ = ______)) ; }',
      answer: '*src++',
      explanation: '逐个拷贝字符直到 \\0：赋值表达式的值就是被赋的字符，拷到 \\0（值为 0）时循环结束。',
    },
    {
      id: 'c-e22', type: 'coding', title: '水仙花数', difficulty: 4, tags: ['循环', '算法'],
      question: '三位水仙花数：各位数字立方和等于自身（如 153 = 1³+5³+3³）。输出 100~999 中所有水仙花数，空格分隔一行："153 370 371 407"（行尾不留空格）。',
      starterCode: `#include <stdio.h>

int main() {
    /* 枚举 100~999，拆分各位数字 */

    return 0;
}`,
      expectedOutput: '153 370 371 407',
      answer: '对 n：a=n/100（百位）、b=n/10%10（十位）、c=n%10（个位），若 a*a*a+b*b*b+c*c*c==n 则输出。',
      explanation: '整除取高位、取余取低位是拆数字的固定手法。输出格式用"第一个不空格、其余前加空格"控制。',
      hints: ['int a = n / 100, b = n / 10 % 10, c = n % 10;', '用 int first = 1 标志控制空格'],
    },
    {
      id: 'c-e23', type: 'coding', title: '素数筛选计数', difficulty: 4, tags: ['循环', '算法'],
      question: '输出 100 以内素数的个数，格式 "count = 25"。',
      starterCode: `#include <stdio.h>

int main() {
    int count = 0;
    /* 枚举 2~99 判断素数 */

    printf("count = %d\\n", count);
    return 0;
}`,
      expectedOutput: 'count = 25',
      answer: '外层 n 从 2 到 99，内层 i 从 2 到 n-1 试除，发现因子即标记跳出，否则 count++。',
      explanation: '100 以内有 25 个素数。试除上界可优化到 i*i <= n。',
      hints: ['if (n % i == 0) { isPrime = 0; break; }', 'isPrime 标志法'],
    },
    {
      id: 'c-e24', type: 'coding', title: '成绩统计：最高最低平均', difficulty: 5, tags: ['数组', '算法'],
      question: '成绩数组 {78, 92, 65, 88, 54, 90}，输出三行：\nmax = 92\nmin = 54\navg = 77（整数除法即可）',
      starterCode: `#include <stdio.h>

int main() {
    int scores[] = {78, 92, 65, 88, 54, 90};
    int n = 6;
    /* 一遍遍历求最大、最小、总和 */

    return 0;
}`,
      expectedOutput: 'max = 92\nmin = 54\navg = 77',
      answer: 'max/min/sum 初始化为 scores[0]/scores[0]/0，遍历更新；avg = sum / n（467/6=77 整数截断）。',
      explanation: '一遍遍历同时维护三个统计量。注意整数除法截断而非四舍五入。',
      hints: ['int max = scores[0], min = scores[0], sum = 0;', 'sum += scores[i] 与比较更新同行'],
    },
  ],
}
