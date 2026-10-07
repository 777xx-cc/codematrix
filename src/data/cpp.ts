import type { LanguagePack } from './types'

export const cpp: LanguagePack = {
  id: 'cpp',
  name: 'C++',
  zhName: 'C++',
  color: '#659ad2',
  gradient: 'from-blue-500 to-indigo-600',
  icon: '⚙️',
  tagline: '性能与抽象的黄金平衡',
  description: '在 C 之上加入面向对象与泛型编程，是游戏引擎、高频交易与系统软件的主力语言。',
  playgroundTemplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CodeMatrix!" << endl;
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1+2+...+100 = " << sum << endl;
    return 0;
}`,
  chapters: [
    {
      id: 'cpp-ch1',
      title: '第 1 章 C++ 入门',
      intro: 'C++ 与 C 的关系、编译流程、iostream 输入输出。',
      sections: [
        {
          title: '1.1 从 C 到 C++',
          content: [
            'C++ 由 Bjarne Stroustrup 于 1980 年代在 C 基础上开发，最初叫"带类的 C"。它完全兼容 C 语法，并加入类、模板、异常、STL 等特性。',
            '编译流程：预处理（展开 #include 与宏）→ 编译（生成汇编）→ 汇编（生成目标文件 .o）→ 链接（生成可执行文件）。g++ main.cpp -o main 一步完成。',
            '源文件后缀通常是 .cpp，头文件 .h 或 .hpp。C++ 标准演进：C++98 → C++11（现代 C++ 起点：auto、Lambda、智能指针）→ C++14/17/20/23 持续增强。',
            'C++ 的设计哲学：零开销抽象（不用的特性不付代价）、信任程序员（给你足够自由的控制权）。',
          ],
          code: {
            lang: 'cpp',
            caption: '第一个 C++ 程序',
            source: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
          },
        },
        {
          title: '1.2 cin 与 cout',
          content: [
            'cout << 用于输出，<< 是插入运算符，可连续链式书写；endl 换行并刷新缓冲区（频繁用 endl 比 "\\n" 慢，大量输出时注意）。',
            'cin >> 用于输入，自动跳过空白字符。类型不匹配会进入失败状态，可用 cin.fail() 检测、cin.clear() 恢复。getline(cin, s) 读取整行（含空格）。',
            'using namespace std; 省去 std:: 前缀，但大型项目推荐显式写 std::cout，避免命名冲突——考试中两种写法都接受。',
            '格式化输出：<iomanip> 提供 setw(n) 设置宽度、setprecision(n) 控制精度、fixed 定点小数。如 cout << fixed << setprecision(2) << 3.14159 输出 3.14。',
          ],
        },
        {
          title: '1.3 命名空间与引用初步',
          content: [
            '命名空间 namespace 解决命名冲突：namespace A { int x; }，用 A::x 访问。:: 是作用域运算符，单独 ::x 表示访问全局变量。',
            '引用是变量的别名：int& r = a; 定义时必须初始化，之后对 r 的操作就是对 a 的操作。引用不能"改嫁"（不能改绑其他变量），也不存在空引用。',
            '引用与指针的区别速记：引用是"另一个名字"，指针是"存地址的变量"；引用必须初始化不可改绑，指针可以为空可以改指向；引用更安全，指针更灵活。',
          ],
        },
      ],
      quiz: [
        {
          question: 'C++ 编译流程的正确顺序是？',
          options: ['A. 编译→预处理→汇编→链接', 'B. 预处理→编译→汇编→链接', 'C. 预处理→汇编→编译→链接', 'D. 链接→编译→预处理→汇编'],
          answer: 'B',
          explanation: '预处理展开宏与头文件 → 编译生成汇编 → 汇编生成目标文件 → 链接成可执行文件。',
        },
        {
          question: 'cout << fixed << setprecision(2) << 3.14159 的输出是 ______。',
          answer: '3.14',
          explanation: 'fixed 定点 + setprecision(2) 保留两位小数（四舍五入），需 #include <iomanip>。',
        },
        {
          question: '关于引用，下列说法错误的是？',
          options: ['A. 定义时必须初始化', 'B. 可以重新绑定到其他变量', 'C. 是变量的别名', 'D. 可作为函数参数修改实参'],
          answer: 'B',
          explanation: '引用一旦绑定终身不改，后续"赋值"改的是被绑定变量的值而非重新绑定。',
        },
      ],
    },
    {
      id: 'cpp-ch2',
      title: '第 2 章 数据类型与运算',
      intro: '内置类型、类型转换、auto 与常量。',
      sections: [
        {
          title: '2.1 内置数据类型',
          content: [
            '整型：short(2 字节)、int(4)、long(4 或 8)、long long(8)，均可加 unsigned 前缀翻倍正数范围。浮点：float(4，约 7 位有效数字)、double(8，约 15 位)。',
            'sizeof 运算符返回类型或对象占的字节数：sizeof(int) 通常为 4。bool 占 1 字节，true/false 对应 1/0，可与整数互相转换（与 Java 不同）。',
            'auto 关键字让编译器推导类型：auto x = 3.14;（x 为 double），C++11 起支持，遍历容器时 auto& 尤其方便。',
            '字面量后缀：100L(long)、100U(unsigned)、3.14f(float)；前缀：0x 十六进制、0 开头八进制、0b 二进制（C++14）。',
          ],
        },
        {
          title: '2.2 类型转换与运算规则',
          content: [
            '隐式转换遵循"向大看齐"：int 与 double 混合运算时 int 先转 double。char 参与运算先提升为 int（用 ASCII 值参与）。',
            '显式转换：C 风格 (int)3.9；C++ 风格 static_cast<int>(3.9)，更安全、意图更明确，推荐使用。还有 const_cast、dynamic_cast、reinterpret_cast 三个专用转换。',
            '整数除法与 C 一致：7/2=3；要得小数至少一边为浮点：7/2.0=3.5。取余 % 只能用于整数。',
            '无符号陷阱：unsigned int 与 int 混合运算时 int 被转成 unsigned，-1 会变成 4294967295！比较循环下标时慎用 unsigned。',
          ],
        },
        {
          title: '2.3 常量与 constexpr',
          content: [
            'const 常量：const double PI = 3.14159; 定义时必须初始化，之后不可修改。',
            'const 与指针三连：const int* p（指向的内容不可改）、int* const p（指针本身不可改）、const int* const p（都不可改）——从右往左读。',
            'constexpr（C++11）表示编译期常量：constexpr int N = 100; 可用于数组长度，比 #define 有类型检查，现代 C++ 推荐用它取代宏常量。',
          ],
        },
      ],
      quiz: [
        {
          question: 'cout << 7 / 2 << " " << 7.0 / 2 的输出是？',
          options: ['A. 3.5 3.5', 'B. 3 3.5', 'C. 3 3', 'D. 编译错误'],
          answer: 'B',
          explanation: '整数除法截断得 3；有浮点参与则按浮点计算得 3.5。',
        },
        {
          question: '表达式 (int)3.99 + (int)1.01 的值是 ______。',
          answer: '4',
          explanation: '强转截断小数（不是四舍五入）：3 + 1 = 4。',
        },
        {
          question: 'const int* p 与 int* const p 的区别是？',
          answer: '前者指向的内容不可通过 p 修改（指针可改指向）；后者指针本身不可改指向（内容可改）',
          explanation: '读法：从右往左。const 在 * 左修饰内容，在 * 右修饰指针本身。',
        },
      ],
    },
    {
      id: 'cpp-ch3',
      title: '第 3 章 流程控制与函数',
      intro: '分支循环与函数重载、默认参数、内联函数。',
      sections: [
        {
          title: '3.1 分支与循环',
          content: [
            'if 的条件可以是整数（非 0 即真），因此 if (x = 5) 编译通过且恒真——把赋值误写成条件是 C/C++ 最经典的 bug，防御写法是把常量写左边：if (5 == x)。',
            'switch 只支持整型、字符型、枚举，不支持浮点和字符串（与 Java 不同）。case 穿透规则与 Java 一致。',
            '循环三兄弟 for / while / do-while 与 break / continue 语义与 C 完全一致。C++11 范围 for：for (int x : arr) 遍历容器/数组，加 & 可修改元素。',
            'goto 语句可跳到标签，除跳出多重嵌套外应避免使用——结构化编程的基本共识。',
          ],
        },
        {
          title: '3.2 函数进阶特性',
          content: [
            '函数重载：同名函数靠参数列表区分（个数/类型），返回值不同不构成重载。编译器按"最匹配"原则选择，歧义时报错。',
            '默认参数：int area(int w, int h = 5); 默认参数必须从右往左连续提供；声明给默认值，定义不再重复给。',
            '内联函数 inline 建议编译器把函数体嵌入调用处，省去调用开销，适合短小频繁调用的函数。递归函数不能真正内联。',
            '函数声明与定义分离：原型 int add(int, int); 放头文件，定义放源文件。调用前必须有声明，否则编译报错。',
          ],
        },
        {
          title: '3.3 引用传参与函数返回引用',
          content: [
            '值传递产生副本，改形参不影响实参；引用传参 void swap(int& a, int& b) 直接操作原变量——比指针写法更优雅安全，是 C++ 特色。',
            '大对象传参用 const 引用：void print(const string& s) 避免拷贝开销，又防止误改。',
            '函数可以返回引用（如 operator<< 链式输出），但绝不能返回局部变量的引用——局部变量随函数结束销毁，返回的是悬垂引用。',
          ],
          code: {
            lang: 'cpp',
            caption: '引用实现交换',
            source: `void swap(int& a, int& b) {
    int t = a; a = b; b = t;
}
int main() {
    int x = 3, y = 5;
    swap(x, y);
    cout << x << " " << y << endl;  // 5 3
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'if (x = 5) 在 C++ 中？',
          options: ['A. 编译错误', 'B. 恒为假', 'C. 恒为真且 x 被赋值为 5', 'D. 比较 x 是否等于 5'],
          answer: 'C',
          explanation: '= 是赋值，表达式值为 5（非 0 即真）。防御写法 if (5 == x) 让编译器帮你抓笔误。',
        },
        {
          question: '下列哪组函数构成合法重载？',
          options: ['A. int f(int); double f(int);', 'B. int f(int); int f(double);', 'C. int f(int a); int f(int b);', 'D. void f(); int f();'],
          answer: 'B',
          explanation: '重载看参数列表（类型/个数/顺序）；仅返回值不同（A、D）或仅参数名不同（C）不构成重载。',
        },
        {
          question: '默认参数必须从 ______ 往 ______ 连续提供。',
          answer: '右；左',
          explanation: 'int f(int a, int b = 1, int c = 2) 合法；int f(int a = 1, int b) 非法。',
        },
        {
          question: '函数返回局部变量的引用会导致 ______。',
          answer: '悬垂引用（未定义行为）',
          explanation: '局部变量在函数结束时销毁，返回的引用指向已释放的内存。',
        },
      ],
    },
    {
      id: 'cpp-ch4',
      title: '第 4 章 数组、指针与字符串',
      intro: 'C++ 内存模型的核心：指针运算、动态内存与 string 类。',
      sections: [
        {
          title: '4.1 指针深入',
          content: [
            '指针保存地址：int* p = &a; *p 解引用访问目标。指针+1 按所指类型大小步进（int* 加 4 字节）。& 取地址、* 解引用，是一对互逆运算。',
            '数组名是首元素地址（常量指针），arr[i] 等价于 *(arr + i)。指针与数组不等价：sizeof(arr) 是整个数组大小，sizeof(p) 是指针本身大小（64 位系统 8 字节）。',
            '空指针写 nullptr（C++11），不要再写 NULL 或 0。野指针（未初始化）与内存泄漏是指针两大事故源。',
            '指针数组 int* arr[5]（数组，元素是指针）与数组指针 int (*p)[5]（指针，指向数组）——优先级 () > [] > *，读法从内向外。',
          ],
        },
        {
          title: '4.2 动态内存',
          content: [
            'new 在堆上申请：int* p = new int(10); 释放用 delete p;。数组形式：new int[n] 配 delete[] p;——必须成对匹配，混用是未定义行为。',
            '忘记 delete 造成内存泄漏；delete 后继续访问是悬垂指针，规范做法是 delete 后立即 p = nullptr。',
            '栈与堆对比：栈上变量自动管理、速度快、空间有限（几 MB）；堆上手动管理、空间大、速度稍慢。大数组必须放堆上（栈会溢出）。',
            '现代 C++ 推荐智能指针（unique_ptr/shared_ptr）自动管理内存，遵循 RAII 原则；但考试仍以原生指针为主。',
          ],
        },
        {
          title: '4.3 string 类与 C 字符串',
          content: [
            'std::string 是 C++ 的字符串类：支持 + 拼接、== 直接比较、length()/size()、substr(pos,len)、find()、c_str() 转 C 字符串、push_back 追加字符。',
            'C 风格字符串是 char 数组，以 \\0 结尾，用 strlen/strcpy/strcat/strcmp 操作，易越界，工程中优先用 string。',
            'string 下标访问 s[i] 不检查越界（可能 UB），s.at(i) 越界抛 out_of_range 异常——要安全用 at。',
          ],
          code: {
            lang: 'cpp',
            source: `string s = "Code";
s += "Matrix";               // 拼接
cout << s.length() << endl;  // 10
cout << s.substr(0, 4) << endl;  // Code
if (s == "CodeMatrix") cout << "相等" << endl;`,
          },
        },
        {
          title: '4.4 结构体与联合体',
          content: [
            'struct 把不同类型的数据打包：struct Point { double x, y; }; C++ 中 struct 与 class 几乎相同，唯一区别是默认访问权限（struct 为 public）。',
            '成员访问：对象用 .（p.x），指针用 ->（pp->x 等价于 (*pp).x）。',
            'union 共用同一块内存，大小取决于最大成员，任一时刻只有效存储一个成员——了解即可。',
          ],
        },
      ],
      quiz: [
        {
          question: 'int a[5]; sizeof(a) 与 int* p = a; sizeof(p) 在 64 位系统分别是？',
          options: ['A. 20 和 8', 'B. 5 和 8', 'C. 20 和 20', 'D. 8 和 20'],
          answer: 'A',
          explanation: '数组名做 sizeof 得整个数组 5×4=20 字节；指针做 sizeof 得指针本身 8 字节。',
        },
        {
          question: 'new int[10] 分配的内存应该用 ______ 释放。',
          answer: 'delete[]',
          explanation: 'new[] 必须配对 delete[]，混用 delete 是未定义行为。',
        },
        {
          question: 'int a[] = {10, 20, 30}; int* p = a; *(p + 1) 的值是？',
          options: ['A. 10', 'B. 20', 'C. 30', 'D. 地址值'],
          answer: 'B',
          explanation: 'p+1 指向 a[1]，解引用得 20。指针步进单位是元素大小而非 1 字节。',
        },
        {
          question: 'string s = "abc"; s.at(5) 与 s[5] 的区别是？',
          answer: 'at(5) 越界抛 out_of_range 异常；s[5] 不检查，是未定义行为',
          explanation: '要安全用 at()，要速度用 []（确保不越界）。',
        },
      ],
    },
    {
      id: 'cpp-ch5',
      title: '第 5 章 类与对象',
      intro: '封装、构造/析构、拷贝控制、this 指针与运算符重载。',
      sections: [
        {
          title: '5.1 类的基本结构',
          content: [
            'class 默认成员为 private，struct 默认为 public——这是二者唯一区别。成员函数可在类内声明、类外用 类名:: 定义。',
            '构造函数与类同名无返回类型；析构函数 ~类名() 无参无返回，对象销毁时自动调用，用于释放资源。',
            '构造顺序：先成员对象后自身；析构顺序恰好相反。对象数组要求存在无参构造（或提供初始化列表）。',
            '成员初始化列表：Point(int x, int y) : x(x), y(y) {} 比在函数体赋值更高效，const 成员与引用成员必须用初始化列表。',
          ],
        },
        {
          title: '5.2 拷贝构造与运算符重载',
          content: [
            '拷贝构造 MyClass(const MyClass& other) 在用已有对象初始化新对象时调用；赋值运算符 operator= 在已存在对象之间赋值时调用——区分场景是高频考点：A a = b; 是拷贝构造（初始化），a = b; 是赋值运算符。',
            '深拷贝 vs 浅拷贝：类中有裸指针成员时，编译器默认的浅拷贝会导致两个对象共享同一块堆内存，析构时 double free，必须自写拷贝构造与赋值运算符（三/五法则）。',
            '运算符重载本质是按特殊命名的函数：Complex operator+(const Complex& o)。不能改变优先级、不能造新运算符、. :: sizeof ?: 不可重载。',
          ],
          code: {
            lang: 'cpp',
            caption: '重载 + 运算符',
            source: `class Complex {
    double re, im;
public:
    Complex(double r, double i) : re(r), im(i) {}
    Complex operator+(const Complex& o) {
        return Complex(re + o.re, im + o.im);
    }
    void show() { cout << re << "+" << im << "i" << endl; }
};`,
          },
        },
        {
          title: '5.3 this 指针与静态成员',
          content: [
            'this 是指向当前对象的指针，成员函数内部隐式可用。return *this 返回自身引用支持链式调用（如连续 +=）。',
            'static 成员变量全类共享一份，类外初始化：int Counter::count = 0;；static 成员函数没有 this 指针，只能访问静态成员。',
            '友元 friend 函数/类可以访问类的 private 成员，常用于重载 << >> 运算符（左操作数是 ostream，无法做成成员函数）。',
          ],
        },
      ],
      quiz: [
        {
          question: 'A a; A b = a; 与 b = a;（b 已存在）分别调用？',
          options: ['A. 都是拷贝构造', 'B. 拷贝构造和赋值运算符', 'C. 赋值运算符和拷贝构造', 'D. 都是构造函数'],
          answer: 'B',
          explanation: '定义时初始化走拷贝构造；已存在对象之间赋值走 operator=。',
        },
        {
          question: '类中含有指针成员指向堆内存，只写析构函数会发生什么？',
          answer: '浅拷贝导致两个对象共享同一块内存，析构时同一块内存被 delete 两次（double free）',
          explanation: '三/五法则：需要自定义析构的类，几乎一定也要自定义拷贝构造和赋值运算符。',
        },
        {
          question: 'static 成员函数中能否访问非静态成员变量？为什么？',
          answer: '不能。static 成员函数没有 this 指针，不知道操作哪个对象',
          explanation: '静态成员属于类；非静态成员属于对象。没有对象就没有非静态成员。',
        },
      ],
    },
    {
      id: 'cpp-ch6',
      title: '第 6 章 继承、多态与 STL',
      intro: '虚函数、多态机制与标准模板库容器。',
      sections: [
        {
          title: '6.1 继承与多态',
          content: [
            '继承方式 public/protected/private 决定父类成员在子类中的可见性，class 默认 private 继承，struct 默认 public。公有继承表达 is-a 关系。',
            '多态条件：父类声明 virtual 虚函数 + 基类指针/引用指向子类对象。虚函数靠虚表（vtable）在运行时决定调用哪个版本（动态绑定）。',
            '纯虚函数 virtual void draw() = 0; 使类成为抽象类，不能实例化。含纯虚函数的类只能作接口/基类。',
            '父类析构函数应声明为 virtual，否则通过父类指针 delete 子类对象时子类析构不会执行——内存泄漏的经典来源。构造与析构函数中调用虚函数不多态。',
          ],
        },
        {
          title: '6.2 STL 三大件',
          content: [
            '容器：vector（动态数组，push_back/[]，自动扩容）、list（双向链表）、stack/queue（适配器，LIFO/FIFO）、set/map（红黑树，自动排序去重）、unordered_map（哈希表，平均 O(1)）。',
            '迭代器是"泛化的指针"：for (auto it = v.begin(); it != v.end(); ++it)，C++11 起更常用范围 for：for (auto& x : v)。',
            '算法头文件 <algorithm>：sort(v.begin(), v.end())、find、count、reverse、max_element、lower_bound（二分），全部配合迭代器工作。',
            'sort 自定义比较：sort(v.begin(), v.end(), greater<int>()) 降序；或传 Lambda sort(..., [](int a, int b){ return a > b; })。',
          ],
          code: {
            lang: 'cpp',
            caption: 'vector + sort',
            source: `#include <vector>
#include <algorithm>
vector<int> v = {5, 2, 8, 1};
sort(v.begin(), v.end());        // 1 2 5 8
for (int x : v) cout << x << " ";
v.push_back(10);                  // 尾部插入`,
          },
        },
        {
          title: '6.3 map 与 pair 实战',
          content: [
            'map<string, int> cnt; cnt["apple"]++ 是最流行的计数写法——operator[] 在键不存在时自动插入默认值（int 为 0）。',
            'pair 是二元组：make_pair(a, b)，用 .first / .second 访问；map 的迭代器 *it 就是 pair。',
            '遍历 map：for (auto& [k, v] : m)（C++17 结构化绑定）或 for (auto& p : m) cout << p.first << p.second。',
          ],
        },
      ],
      quiz: [
        {
          question: 'class Base { public: void f(){ cout<<"B"; } }; class D : public Base { public: void f(){ cout<<"D"; } }; Base* p = new D(); p->f(); 输出？',
          options: ['A. D', 'B. B', 'C. 编译错误', 'D. 运行崩溃'],
          answer: 'B',
          explanation: 'f 不是虚函数，静态绑定按指针声明类型调用 Base::f。想输出 D 必须给 Base::f 加 virtual。',
        },
        {
          question: '为什么基类的析构函数通常要声明为 virtual？',
          answer: '否则通过基类指针 delete 子类对象时只调用基类析构，子类部分资源泄漏',
          explanation: '虚析构保证 delete 时按实际对象类型走完整析构链。',
        },
        {
          question: 'vector 与 list 的核心区别是？',
          answer: 'vector 底层连续数组，随机访问 O(1) 中间插删慢；list 底层双向链表，插删 O(1) 但不能随机访问',
          explanation: '与 Java 的 ArrayList/LinkedList 对应。绝大多数场景首选 vector。',
        },
        {
          question: 'map<string,int> m; 执行 m["x"]++ 后 m["x"] 的值为 ______。',
          answer: '1',
          explanation: 'operator[] 对不存在的键自动插入默认值 0，再自增得 1——这是计数器的标准写法。',
        },
      ],
    },
    {
      id: 'cpp-ch7',
      title: '第 7 章 指针与引用进阶',
      intro: '指针是 C++ 的威力之源，也是 bug 之源。本章把指针的高级形态一次讲透：指针运算、指针数组、二级指针、函数指针，以及和引用的本质区别。',
      sections: [
        {
          title: '7.1 指针运算与指针数组',
          content: [
            '指针加减的单位是"一个元素"而不是一个字节：int *p 的 p + 1 地址实际前进 4 字节。这正是 p[i] 等价于 *(p + i) 的原因。',
            '指针数组：int *arr[5] 是"装指针的数组"，每个元素都是 int*。常用来管理多个字符串：const char *names[] = {"张三", "李四"}。',
            '数组指针：int (*p)[5] 是"指向整个数组的指针"，括号不能省——它和指针数组只差一对括号，含义天差地别。',
            '读复杂声明的口诀"右左右"：从变量名出发，先向右看、再向左看、遇括号跳出。int *arr[5]：arr 先遇 [5]，所以是数组，元素是 int*。',
          ],
          code: {
            lang: 'cpp',
            caption: '指针运算与指针数组',
            source: `int a[3] = {10, 20, 30};
int *p = a;
cout << *(p + 1);   // 20，前进一个 int（4 字节）

const char *names[] = {"张三", "李四", "王五"};
for (int i = 0; i < 3; i++) {
    cout << names[i] << endl;  // 逐个打印字符串
}

int (*q)[3] = &a;  // 指向整个数组的指针
cout << (*q)[2];   // 30`,
          },
        },
        {
          title: '7.2 二级指针与指针作函数参数',
          content: [
            '二级指针 int **pp 存"指针的地址"：int a = 1; int *p = &a; int **pp = &p; 则 **pp 就是 1。',
            '函数想改变调用者的指针本身（比如让指针指向新分配的内存），必须传指针的指针（或指针的引用）：void alloc(int **pp) { *pp = new int(5); }。',
            'C++ 有更优雅的选择——指针的引用：void alloc(int *&p) { p = new int(5); }，调用处直接传 p 即可，代码清爽得多。',
            'main 函数的参数 int main(int argc, char *argv[]) 里 argv 就是指针数组（等价 char **argv），存放命令行参数。',
          ],
          code: {
            lang: 'cpp',
            caption: '二级指针 vs 指针引用',
            source: `// C 风格：二级指针
void alloc(int **pp) { *pp = new int(42); }

// C++ 风格：指针的引用，更推荐
void alloc2(int *&p) { p = new int(43); }

int main() {
    int *p = nullptr;
    alloc(&p);   // 传指针的地址
    alloc2(p);   // 直接传，引用天然"可改"
    cout << *p;  // 43
    delete p;
}`,
          },
        },
        {
          title: '7.3 函数指针初步',
          content: [
            '函数也有地址，可以存进指针：int (*fp)(int, int) = add; 之后 fp(3, 4) 等价于 add(3, 4)。',
            '函数指针的价值在"回调"：把函数当作参数传给另一个函数，让对方在合适的时候调用它。qsort、sort 的比较函数就是这个思想。',
            'C++11 的 lambda 表达式 [ ](int a, int b){ return a < b; } 是匿名小函数，多数场景已取代手写函数指针。',
            '判断优先级：函数声明 int *f(int) 是"返回 int* 的函数"；int (*f)(int) 才是"指向函数的指针"——那对括号决定一切。',
          ],
          code: {
            lang: 'cpp',
            caption: '函数指针与 lambda 回调',
            source: `#include <algorithm>

int add(int a, int b) { return a + b; }

int main() {
    int (*fp)(int, int) = add;   // 函数指针
    cout << fp(3, 4);            // 7

    int v[3] = {3, 1, 2};
    // lambda 作为比较回调：降序
    std::sort(v, v + 3, [](int a, int b) { return a > b; });
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'int *p 指向 int 数组首元素，p + 2 的地址实际前进多少字节（int 为 4 字节）？',
          options: ['A. 2 字节', 'B. 4 字节', 'C. 8 字节', 'D. 取决于数组长度'],
          answer: 'C',
          explanation: '指针算术以元素为单位：p + 2 前进 2 个 int，即 2 × 4 = 8 字节。',
        },
        {
          question: '函数中想让调用者的指针指向新内存，C++ 最推荐的参数写法是？',
          answer: '指针的引用 void f(int *&p)，在函数内直接 p = new int(...)',
          explanation: '值传递改不了实参指针本身；二级指针可行但繁琐；指针引用既直观又安全，是 C++ 的改进。',
        },
        {
          question: 'int (*f)(int) 和 int *f(int) 的区别是？',
          answer: '前者是指向"参数 int、返回 int 的函数"的指针；后者是"参数 int、返回 int* 的函数"的声明',
          explanation: '括号改变结合优先级：(*f) 先结合说明 f 是指针；没有括号则 f 先与 (int) 结合成函数声明。',
        },
      ],
    },
    {
      id: 'cpp-ch8',
      title: '第 8 章 STL 实战进阶',
      intro: 'STL 是 C++ 程序员的武器库。本章把容器与算法拉到实战强度：vector/string 高频操作、set 与哈希容器的选择、迭代器与 algorithm 库的杀手锏组合。',
      sections: [
        {
          title: '8.1 vector 与 string 高频操作',
          content: [
            '`vector` 动态数组核心操作：push_back 追加、pop_back 删尾、size() 大小、empty() 判空、clear() 清空、front()/back() 取首尾。[] 不检查越界，at() 会抛异常。',
            'vector 扩容会整体搬家（容量翻倍策略），频繁 push_back 前用 reserve(n) 预留空间能显著提速。size 是元素个数，capacity 是底层容量，别混淆。',
            '`string` 高频操作：s += "x" 拼接、s.substr(1, 3) 截取、s.find("ab") 查找（找不到返回 string::npos）、s.insert / s.erase / s.replace 增删改。',
            '字符串与数字互转：to_string(42) 得 "42"；stoi("123")、stod("3.14") 转回数字，转换失败抛异常。',
          ],
          code: {
            lang: 'cpp',
            caption: 'vector 与 string 的日常',
            source: `vector<int> v;
v.reserve(100);            // 预留空间，避免反复扩容
for (int i = 0; i < 5; i++) v.push_back(i * i);

string s = "hello world";
cout << s.substr(6);              // "world"
size_t pos = s.find("o");
if (pos != string::npos) cout << pos;  // 4

string num = to_string(2026);
int y = stoi(num) + 1;            // 2027`,
          },
        },
        {
          title: '8.2 set、unordered_map 与哈希容器',
          content: [
            '`set` 自动去重且有序（红黑树）：插入自动排序，begin() 就是最小值。multiset 允许重复。',
            '`unordered_set / unordered_map` 是哈希版：查找插入平均 O(1)，比 set/map 的 O(log n) 更快，但元素无序。只要快不要顺序就用它。',
            'map 的 [] 有副作用：m["key"] 在键不存在时会自动插入一个默认值！只想查询请用 find() 或 count()。',
            '遍历有序与无序容器写法相同：for (auto &[k, v] : m)（C++17 结构化绑定），但输出的顺序一个按 key 排好、一个"随机"。',
          ],
          code: {
            lang: 'cpp',
            caption: 'set 去重排序 + unordered_map 词频统计',
            source: `#include <set>
#include <unordered_map>

set<int> s = {5, 1, 3, 1, 5};   // 自动去重+排序
for (int x : s) cout << x << " "; // 1 3 5

unordered_map<string, int> cnt;
string words[] = {"a", "b", "a"};
for (auto &w : words) cnt[w]++;   // [] 不存在时自动建 0 再 ++
cout << cnt["a"];                 // 2`,
          },
        },
        {
          title: '8.3 迭代器与 algorithm 算法库',
          content: [
            '`迭代器`是容器与算法之间的"通用插头"：所有容器都提供 begin()/end()，所有算法都操作迭代器区间 [begin, end)——左闭右开是铁律。',
            '#include <algorithm> 常用函数：sort 排序、reverse 反转、count 计数、find 查找、max_element/min_element 求最值（返回迭代器，加 * 取值）、accumulate（在 <numeric> 里）求和。',
            '自定义排序规则：sort(v.begin(), v.end(), greater<int>()) 降序；或传 lambda [](int a, int b){ return a > b; }。',
            'sort 结构体/ pair 时默认按 first 升序、first 相同按 second 升序——pair 的这个特性在做"多关键字排序"时特别好用。',
          ],
          code: {
            lang: 'cpp',
            caption: 'algorithm 库一把梭',
            source: `#include <algorithm>
#include <numeric>

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
sort(v.begin(), v.end());                    // 升序
cout << *max_element(v.begin(), v.end());    // 9
cout << count(v.begin(), v.end(), 1);        // 2
int sum = accumulate(v.begin(), v.end(), 0); // 31

// 多关键字：按成绩降序、成绩相同按年龄升序
vector<pair<int,int>> st = {{90,20},{85,19},{90,18}};
sort(st.begin(), st.end(),
     [](auto &a, auto &b){ return a.first != b.first
         ? a.first > b.first : a.second < b.second; });`,
          },
        },
      ],
      quiz: [
        {
          question: '只想查询 map 中某键是否存在且不想改变 map，应该用？',
          options: ['A. m[key]', 'B. m.find(key) 或 m.count(key)', 'C. m.at(key)', 'D. m[key] = 0'],
          answer: 'B',
          explanation: 'm[key] 在键不存在时会插入默认值，污染容器；find 返回迭代器、count 返回 0/1，都不改变容器。at 会抛异常，也算安全但不是"查询"语义。',
        },
        {
          question: 'set 和 unordered_set 的核心区别是？',
          answer: 'set 元素自动有序、操作 O(log n)（红黑树）；unordered_set 无序、平均 O(1)（哈希表）',
          explanation: '需要有序遍历或取最值用 set；纯粹追求查找插入速度用 unordered_set。',
        },
        {
          question: 'algorithm 库的函数为什么都以 begin()/end() 为参数而不是直接传容器？',
          answer: '迭代器是容器与算法解耦的通用接口：同一算法可作用于任何容器（甚至数组）的任意子区间',
          explanation: '这正是 STL 的设计精髓——算法不关心数据存在哪种容器里，只要能拿到一对迭代器就能工作。',
        },
      ],
    },
    {
      id: 'cpp-ch9',
      title: '第 9 章 内存管理与智能指针',
      intro: '手动 new/delete 是 C++ 最容易出事的地方。RAII 和智能指针让内存"自动回收"，是现代 C++ 的立身之本。学完本章，告别内存泄漏。',
      sections: [
        {
          title: '9.1 RAII：资源获取即初始化',
          content: [
            '`RAII` 是 C++ 最重要的惯用法：把资源（内存、文件、锁）包进对象，构造时获取、析构时释放——离开作用域自动清理，永不遗忘。',
            'vector、string、fstream 都是 RAII 的实践者：你见过给 vector 手动释放内存吗？没有，因为它的析构函数替你做了。',
            '栈展开保证：即使中途抛异常，局部对象的析构函数照样执行——这是 RAII 比"记得写 free"可靠的根本原因。',
            '原则：凡是要"用完记得还"的资源，都应该包进 RAII 对象，而不是依赖程序员的记忆力。',
          ],
          code: {
            lang: 'cpp',
            caption: 'RAII 思维：文件自动关闭',
            source: `#include <fstream>

void writeLog() {
    std::ofstream f("log.txt");  // 构造时打开文件
    f << "hello";
    // 函数结束，f 的析构自动关闭文件——无需 f.close()
    // 即使上面抛异常，文件照样会被关闭
}

// 对比手动管理：任何一条 return/异常路径都可能漏掉 close`,
          },
        },
        {
          title: '9.2 unique_ptr 独占指针',
          content: [
            '`unique_ptr` 独占一块堆内存：离开作用域自动 delete。一个对象只能被一个 unique_ptr 拥有，不可复制（只能 move 转移）。',
            '创建用 make_unique<T>(参数)：auto p = make_unique<int>(42)，比 new 更安全更简洁。',
            '使用和普通指针一样：p->foo()、*p。需要转移所有权时用 std::move(p)，之后 p 变空。',
            '心法：默认就用 unique_ptr，它零开销（和普通指针一样快），却消灭了 90% 的内存错误。',
          ],
          code: {
            lang: 'cpp',
            caption: 'unique_ptr 基本用法',
            source: `#include <memory>
using namespace std;

{
    auto p = make_unique<int>(42);
    cout << *p;              // 42

    // auto q = p;           // 错误！独占指针不能复制
    auto q = move(p);        // 转移所有权，p 变空
    cout << (p == nullptr);  // 1
}   // q 离开作用域，内存自动释放——不需要 delete`,
          },
        },
        {
          title: '9.3 shared_ptr 与 weak_ptr',
          content: [
            '`shared_ptr` 共享所有权：内部维护引用计数，最后一个 shared_ptr 销毁时才释放内存。多个所有者场景使用。',
            '创建用 make_shared<T>()。use_count() 查看当前有几个所有者。',
            '循环引用陷阱：A 持 shared_ptr<B>、B 持 shared_ptr<A>，计数永远不归零，双双泄漏——用 weak_ptr 打破环。',
            '`weak_ptr` 是"弱引用"：不增加计数，用 lock() 临时升级成 shared_ptr 使用，升级失败说明对象已销毁。',
          ],
          code: {
            lang: 'cpp',
            caption: 'shared_ptr 引用计数',
            source: `#include <memory>
using namespace std;

auto a = make_shared<string>("共享数据");
cout << a.use_count();   // 1
{
    auto b = a;          // 共享
    cout << a.use_count(); // 2
}                          // b 销毁
cout << a.use_count();   // 1
// a 销毁时计数归零，内存自动释放

weak_ptr<string> w = a;
if (auto s = w.lock()) cout << *s;  // 安全访问`,
          },
        },
      ],
      quiz: [
        {
          question: 'RAII 的核心思想是？',
          options: ['A. 手动配对 new/delete', 'B. 把资源生命周期绑定到对象生命周期：构造获取、析构释放', 'C. 用垃圾回收器', 'D. 尽量不用堆内存'],
          answer: 'B',
          explanation: '析构函数在离开作用域时必定执行（包括异常路径），把释放逻辑写进析构就永远不会漏。',
        },
        {
          question: 'unique_ptr 不能被复制，要转移所有权应该用什么？',
          answer: 'std::move(p)，转移后原指针变为 nullptr',
          explanation: '独占语义保证了同一时刻只有一个所有者，编译器在复制尝试时直接报错，把错误挡在编译期。',
        },
        {
          question: 'shared_ptr 循环引用导致内存泄漏，破解方法是？',
          answer: '把环形引用中的一条边改成 weak_ptr（弱引用，不计数），需要时 lock() 临时升级',
          explanation: 'weak_ptr 不增加引用计数，环被打破后计数能正常归零释放。',
        },
      ],
    },
    {
      id: 'cpp-ch10',
      title: '第 10 章 模板与泛型编程入门',
      intro: '为什么 vector 能装 int 也能装 string？因为模板。模板是 C++ 的"代码生成器"：写一份逻辑，编译器为每种类型生成专属版本。本章入门函数模板与类模板。',
      sections: [
        {
          title: '10.1 函数模板',
          content: [
            '`函数模板`：template <typename T> 声明一个"类型参数"T，函数里把 T 当类型用。调用时编译器自动推断 T。',
            'myMax(3, 5) 推断 T=int；myMax(2.5, 3.1) 推断 T=double——一份代码服务所有可比较的类型。',
            '显式指定也可以：myMax<double>(3, 5.5)。推断歧义（如 myMax(3, 5.5)）会编译报错，要么统一类型要么显式指定。',
            '模板不是"运行时判断类型"，而是编译期生成多份实例——零运行时开销，但会增大编译产物（代码膨胀）。',
          ],
          code: {
            lang: 'cpp',
            caption: '函数模板 myMax',
            source: `template <typename T>
T myMax(T a, T b) {
    return a > b ? a : b;
}

cout << myMax(3, 5);         // 5（T=int）
cout << myMax(2.5, 3.1);     // 3.1（T=double）
cout << myMax<string>("ab", "abc"); // abc（显式指定）

// myMax(3, 5.5);  // 编译错误：T 推断冲突`,
          },
        },
        {
          title: '10.2 类模板',
          content: [
            '`类模板`：整个类按类型参数化，vector<int>、map<string, int> 都是类模板的实例化。',
            '定义：template <typename T> class Box { T data; ... }; 成员函数若写在类外，每个都要带 template 头和 Box<T>:: 前缀。',
            '实例化时必须给类型：Box<int> b1; Box<string> b2;——这两个是完全不同的类型。',
            '模板参数可以有默认值和非类型参数：template <typename T, int N> class Array 可实现定长数组（std::array 就是这样）。',
          ],
          code: {
            lang: 'cpp',
            caption: '手写一个迷你 Box 类模板',
            source: `template <typename T>
class Box {
    T data;
public:
    void set(T v) { data = v; }
    T get() const { return data; }
};

Box<int> bi;     bi.set(42);
Box<string> bs;  bs.set("hello");
cout << bi.get() << " " << bs.get();  // 42 hello

// std::array 的非类型模板参数：
// array<int, 5> arr;  // 长度 5 写死在类型里`,
          },
        },
        {
          title: '10.3 模板与 STL 的关系及注意事项',
          content: [
            'STL 就是模板的最大实战成果：容器、算法全部模板化，所以才有"一份 sort 排所有类型"。',
            '模板的错误信息以又臭又长著称：类型不满足操作（比如对没有 < 的类型调 myMax）会在实例化时报错，耐心读第一层错误信息。',
            '模板代码通常写在头文件里（实现随声明一起），因为编译器实例化时需要看到完整定义——这是模板项目的惯例。',
            'C++20 的 concepts（requires 子句）可以给模板参数加约束，让报错变得友好，是现代写法。',
          ],
          code: {
            lang: 'cpp',
            caption: '模板 + STL 的组合拳',
            source: `#include <vector>
#include <algorithm>

// 模板函数操作 STL 容器
template <typename T>
void printAll(const std::vector<T>& v) {
    for (const auto& x : v) std::cout << x << " ";
    std::cout << "\\n";
}

std::vector<int> vi = {3, 1, 2};
std::sort(vi.begin(), vi.end());  // sort 也是模板
printAll(vi);                     // 1 2 3
printAll(std::vector<string>{"b", "a"}); // b a`,
          },
        },
      ],
      quiz: [
        {
          question: '调用 myMax(3, 5.5)（一个 int 一个 double）会发生什么？',
          options: ['A. 自动转成 double', 'B. 编译错误：模板参数 T 推断冲突', 'C. 运行时报错', 'D. 返回 5'],
          answer: 'B',
          explanation: 'T 被同时推断为 int 和 double，编译器无法抉择。解法：myMax<double>(3, 5.5) 显式指定。',
        },
        {
          question: '模板的代码生成发生在什么阶段？',
          answer: '编译期：编译器为每种实际使用的类型生成一份实例代码，运行时零额外开销',
          explanation: '这叫"静态多态"，与虚函数的运行时多态相对；代价是每种类型一份代码带来的体积膨胀。',
        },
        {
          question: '为什么模板的实现通常直接写在头文件里？',
          answer: '编译器在实例化模板时必须看到完整定义；实现放在 .cpp 里会导致链接期找不到定义',
          explanation: '模板不是独立编译的代码，而是"生成代码的配方"，所以配方必须随头文件分发给每个使用处。',
        },
      ],
    },
    {
      id: 'cpp-ch11',
      title: '第 11 章 异常处理',
      intro: '错误处理有两种风格：C 的返回值检查，C++ 的异常。异常让"正常逻辑"和"错误处理"分开写，本章学会 throw、try/catch 的正确姿势与 noexcept 契约。',
      sections: [
        {
          title: '11.1 throw 抛出异常',
          content: [
            '`throw` 抛出一个异常对象：throw runtime_error("余额不足")——任何类型都能抛，但标准做法抛 std 异常类。',
            '抛出后函数立刻中止，沿调用链逐层"栈展开"，直到遇到匹配的 catch 或程序终止。',
            '标准异常家族（<stdexcept>）：runtime_error 运行时错误、invalid_argument 参数非法、out_of_range 越界、logic_error 逻辑错误。',
            '构造函数里出错只能抛异常（没有返回值可走）——这是异常不可替代的场景之一。',
          ],
          code: {
            lang: 'cpp',
            caption: 'throw 与标准异常',
            source: `#include <stdexcept>

double divide(double a, double b) {
    if (b == 0) throw std::invalid_argument("除数不能为 0");
    return a / b;
}

double withdraw(double balance, double amount) {
    if (amount > balance)
        throw std::runtime_error("余额不足");
    return balance - amount;
}`,
          },
        },
        {
          title: '11.2 try-catch 捕获',
          content: [
            '`try` 包住可能抛异常的代码，`catch` 按类型捕获：catch (const invalid_argument& e) { e.what() } 取错误信息。',
            '多个 catch 从上到下匹配，先子类后父类；catch (...) 捕获一切（兜底用）。',
            '按 const 引用捕获异常对象（const X&），避免拷贝和对象切片。',
            'catch 后处理不了可以 throw;（裸 throw）原样向上转抛。',
            '析构函数里绝不能让异常逃出去（栈展开中再抛异常会直接 terminate），析构要 noexcept。',
          ],
          code: {
            lang: 'cpp',
            caption: '分层捕获的标准写法',
            source: `try {
    double r = divide(10, 0);
    cout << r;                 // 不会执行到这里
}
catch (const std::invalid_argument& e) {
    cerr << "参数错误: " << e.what() << "\\n";
}
catch (const std::exception& e) {   // 父类兜底所有标准异常
    cerr << "异常: " << e.what() << "\\n";
}
catch (...) {                        // 最后一道防线
    cerr << "未知异常\\n";
}`,
          },
        },
        {
          title: '11.3 noexcept 与异常安全',
          content: [
            '`noexcept` 承诺函数不抛异常：编译器据此优化，move 构造是否 noexcept 甚至影响 vector 扩容策略。',
            '异常安全三级别：基本保证（出错不泄漏、状态可回滚）、强保证（要么成功要么原样）、不抛保证（noexcept）。',
            '指南：能用返回值表达的"预期内失败"（如查找不到）不必抛异常；异常留给"异常的、调用方无法继续"的情况。',
            'main 里兜底 catch 所有异常并打印日志，是程序不"裸崩"的最低修养。',
          ],
          code: {
            lang: 'cpp',
            caption: 'noexcept 与主函数兜底',
            source: `void swapInt(int& a, int& b) noexcept {  // 承诺不抛
    int t = a; a = b; b = t;
}

int main() {
    try {
        // 程序主逻辑
    } catch (const std::exception& e) {
        cerr << "程序出错: " << e.what() << "\\n";
        return 1;
    }
    return 0;
}`,
          },
        },
      ],
      quiz: [
        {
          question: '异常被抛出后、被捕获前，沿调用链逐层退出的过程叫？',
          options: ['A. 递归', 'B. 栈展开（stack unwinding）', 'C. 内联', 'D. 重载'],
          answer: 'B',
          explanation: '栈展开会正常调用每层局部对象的析构函数——这正是 RAII 能与异常完美配合的原因。',
        },
        {
          question: '多个 catch 块的排列顺序应该是？',
          answer: '先捕获子类、后捕获父类，catch(...) 放最后兜底',
          explanation: 'catch 按书写顺序匹配，父类在前会把子类异常全部截胡，后面的子类 catch 成了死代码。',
        },
        {
          question: '什么情况适合抛异常而不是返回错误码？',
          answer: '"异常的、当前层无法处理"的失败，如构造函数失败、资源不可用；预期内的业务结果（如查无此项）用返回值更直观',
          explanation: '异常适合跨越多个调用层传递的严重错误；滥用异常处理普通流程会让代码难以阅读且变慢。',
        },
      ],
    },
    {
      id: 'cpp-ch12',
      title: '第 12 章 文件 IO 与流进阶',
      intro: 'cin/cout 只是流世界的入口。本章把流的思想推广到文件和字符串：fstream 读写文件、stringstream 做字符串解析与格式化，一套 API 打天下。',
      sections: [
        {
          title: '12.1 fstream 文件读写',
          content: [
            '`ifstream` 读文件、`ofstream` 写文件、`fstream` 读写均可，都在 <fstream> 里。用法和 cin/cout 一模一样——这就是流抽象的魅力。',
            '打开时检查：if (!f) 或 f.is_open()，文件不存在时静默失败是常见坑。',
            '写文件默认清空原内容；追加模式用 ofstream f("a.txt", ios::app)。',
            '流是 RAII 对象，离开作用域自动关闭，一般不需要手动 close()。',
          ],
          code: {
            lang: 'cpp',
            caption: '文件读写模板',
            source: `#include <fstream>
#include <iostream>
using namespace std;

// 写
ofstream out("scores.txt");
out << "张三 90\\n" << "李四 85\\n";   // 与 cout 同款语法

// 读
ifstream in("scores.txt");
if (!in) { cerr << "打不开文件\\n"; return 1; }
string name; int score;
while (in >> name >> score) {        // 读到末尾自动失败退出
    cout << name << ": " << score << "\\n";
}`,
          },
        },
        {
          title: '12.2 流的状态与按行读取',
          content: [
            '流有四个状态位：good、eof（到尾）、fail（格式错）、bad（坏了）。while (in >> x) 就是在检查 fail。',
            '`getline(in, line)` 按行读整行文本（含空格），配合 stringstream 再做行内解析是标准套路。',
            '类型不匹配（比如读 int 遇到字母）会让流进入 fail 状态，后续读全部失败；clear() 复位、ignore() 丢弃坏输入。',
            '二进制文件用 ios::binary 打开 + read()/write() 按字节块读写，文本模式的换行转换会损坏二进制数据。',
          ],
          code: {
            lang: 'cpp',
            caption: '按行读 + 行内解析',
            source: `ifstream in("data.csv");
string line;
getline(in, line);   // 跳过表头

while (getline(in, line)) {
    // 每行："张三,90,北京"
    stringstream ss(line);
    string name, score, city;
    getline(ss, name, ',');    // 按逗号切
    getline(ss, score, ',');
    getline(ss, city, ',');
    cout << name << " " << stoi(score) << " " << city << "\\n";
}`,
          },
        },
        {
          title: '12.3 stringstream：内存中的流',
          content: [
            '`stringstream` 把字符串当流用：sstream >> 从字符串里"读"出各种类型的值，<< 把各种值"写"进字符串。',
            '解析利器：一行混合文本 "张三 90 1.78"，ss >> name >> score >> height 自动按类型拆分转换。',
            '格式化利器：拼数字+字符串不用手写转换，ss << "第" << i << "名" 再 ss.str() 取结果。',
            '重复使用要 ss.clear() 清状态 + ss.str("") 清内容，两个都要清是易错点。',
          ],
          code: {
            lang: 'cpp',
            caption: 'stringstream 双向用法',
            source: `#include <sstream>

// 解析：从字符串拆数据
string text = "弈 18 175.5";
stringstream ss(text);
string name; int age; double height;
ss >> name >> age >> height;     // 自动按类型转换

// 格式化：把数据拼成字符串
stringstream out;
out << name << " 今年 " << age << " 岁，身高 " << height << "cm";
string result = out.str();       // 取出拼接结果`,
          },
        },
      ],
      quiz: [
        {
          question: 'while (in >> x) 循环能自动在文件读完时退出，其原理是？',
          options: ['A. 编译器特殊处理', 'B. 读取失败（含到文件尾）使流进入 fail 状态，流的布尔转换返回 false', 'C. x 变成 0', 'D. 抛出异常'],
          answer: 'B',
          explanation: '流对象在布尔上下文中检查自身状态；到尾或格式错误都会使表达式为假，循环优雅退出。',
        },
        {
          question: '处理 "张三,90,北京" 这种逗号分隔行，标准套路是？',
          answer: 'getline(in, line) 读整行，再用 stringstream + getline(ss, field, \',\') 按逗号逐段切分',
          explanation: '两级解析：先按行、再按分隔符，比手工 find 逗号位置稳健得多。',
        },
        {
          question: '复用同一个 stringstream 对象前需要做哪两步清理？',
          answer: 'ss.clear() 清除状态标志，ss.str("") 清空内容缓冲区',
          explanation: '只清内容不清状态（或反之）都会导致后续读写诡异失败，这是 stringstream 最著名的坑。',
        },
      ],
    },
    {
      id: 'cpp-ch13',
      title: '第 13 章 Lambda 与现代 C++ 特性',
      intro: 'C++11 之后的 C++ 被称为"现代 C++"，几乎是一门新语言。本章拿下最常用的四件新武器：Lambda、范围 for、auto 与结构化绑定、移动语义概念。',
      sections: [
        {
          title: '13.1 Lambda 表达式',
          content: [
            '`Lambda` 是就地定义的匿名函数：[捕获列表](参数){ 函数体 }，随写随用，不必跑到远处定义。',
            '捕获列表决定能"看到"哪些外部变量：[] 不捕获、[&] 全引用捕获、[=] 全值捕获、[x, &y] 按需捕获。',
            '值捕获是"拍照"（定义时复制），引用捕获是"实时监控"（注意别引用到已销毁的变量）。',
            '配 STL 算法天作之合：sort、for_each、find_if 的第三个参数几乎都用 Lambda 写。',
          ],
          code: {
            lang: 'cpp',
            caption: 'Lambda 捕获实战',
            source: `int threshold = 60;
vector<int> scores = {45, 78, 90, 55};

// 按值捕获 threshold，统计及格人数
int n = count_if(scores.begin(), scores.end(),
                 [threshold](int s) { return s >= threshold; });

// 引用捕获 n，就地累加
for_each(scores.begin(), scores.end(),
         [&n](int s) { n += s; });

auto cmp = [](int a, int b) { return a > b; };  // 存入变量复用
sort(scores.begin(), scores.end(), cmp);`,
          },
        },
        {
          title: '13.2 auto、范围 for 与结构化绑定',
          content: [
            '`auto` 让编译器推类型：auto it = v.begin() 免去写又长又臭的迭代器类型名。',
            '`范围 for`：for (const auto& x : v) 遍历容器——const auto& 是黄金写法：不拷贝、不许改、全类型通吃。',
            '`结构化绑定`（C++17）：auto [key, value] = pair 直接拆包，遍历 map 时代码清爽一半。',
            'auto 别滥用：类型一眼看不出时（尤其涉及数值精度）写明类型更安全。',
          ],
          code: {
            lang: 'cpp',
            caption: '现代遍历三件套',
            source: `map<string, int> scores = {{"张三", 90}, {"李四", 85}};

// 结构化绑定遍历 map
for (const auto& [name, score] : scores) {
    cout << name << ": " << score << "\\n";
}

vector<int> v = {1, 2, 3};
for (auto& x : v) x *= 10;   // 引用才能修改原元素

auto it = find(v.begin(), v.end(), 20);  // auto 接迭代器`,
          },
        },
        {
          title: '13.3 移动语义与右值引用概念',
          content: [
            '拷贝是"照抄一份"，移动是"拎包入住"：`移动语义`允许把大对象的内部资源直接"偷"给新对象，避免昂贵拷贝。',
            '`右值`是临时值（如函数返回值），&& 是右值引用，能绑定到这些"将死之物"上。',
            'std::move(x) 把 x"标记为可被搬走"——之后 x 处于有效但未指定状态，别再用它的内容。',
            '好消息：返回值优化（RVO）和 vector/string 的移动构造都是自动的，日常代码"不知不觉就快了"。',
          ],
          code: {
            lang: 'cpp',
            caption: '移动语义直觉体验',
            source: `vector<int> makeBig() {
    vector<int> v(1000000, 42);
    return v;              // 移动（或 RVO），几乎零成本
}

vector<int> a = makeBig();   // 不是拷贝一百万个元素！

vector<int> b;
b = std::move(a);            // a 的内容"搬"给 b
// 此后 a 为空但仍是合法对象`,
          },
        },
      ],
      quiz: [
        {
          question: 'Lambda 的捕获列表 [&] 与 [=] 的区别是？',
          options: ['A. 完全相同', 'B. [&] 按引用捕获全部外部变量（可改原值），[=] 按值复制（改的是副本）', 'C. [=] 更快', 'D. [&] 只能捕获一个变量'],
          answer: 'B',
          explanation: '引用捕获共享外部变量本体（注意生命周期）；值捕获在 Lambda 定义时拍照，之后外部改动互不影响。',
        },
        {
          question: '遍历容器且要修改元素，范围 for 应写成？',
          answer: 'for (auto& x : v)——引用绑定到原元素；只读遍历用 for (const auto& x : v)',
          explanation: '不加 & 时 x 是每个元素的拷贝，改 x 不影响容器；const auto& 避免拷贝且防止误改。',
        },
        {
          question: 'std::move(a) 之后，变量 a 的状态是？',
          answer: '有效但未指定：通常为空，可以安全析构或重新赋值，但不要读取它的内容',
          explanation: 'move 只是把资源"搬走"的许可，原对象处于"搬空后的房子"状态，STL 保证它仍可被安全销毁。',
        },
      ],
    },
    {
      id: 'cpp-ch14',
      title: '第 14 章 数据结构实战：栈、队列与链表',
      intro: '数据结构是算法的舞台。本章用 STL 和手写代码两条路实现三大基础结构：后进先出的栈、先进先出的队列、动态灵活的链表，并理解各自的应用场景。',
      sections: [
        {
          title: '14.1 栈：后进先出',
          content: [
            '`栈（Stack）`只在一端进出：push 压入、pop 弹出、top 看栈顶。LIFO——后进先出，像叠盘子。',
            '典型应用：括号匹配、表达式求值、函数调用栈、撤销操作（Ctrl+Z）、浏览器后退。',
            'STL 的 std::stack 是容器适配器（默认包在 deque 上）：#include <stack> 后直接 push/pop/top/empty。',
            '括号匹配经典算法：遇左括号入栈，遇右括号弹栈比对，栈空时遇到右括号或结束时栈不空则不匹配。',
          ],
          code: {
            lang: 'cpp',
            caption: '用 stack 检查括号匹配',
            source: `#include <stack>

bool balanced(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[') st.push(c);
        else if (c == ')' || c == ']') {
            if (st.empty()) return false;   // 没有可配的左括号
            char t = st.top(); st.pop();
            if ((c == ')' && t != '(') || (c == ']' && t != '['))
                return false;               // 类型不配
        }
    }
    return st.empty();   // 栈空才算全配上
}`,
          },
        },
        {
          title: '14.2 队列：先进先出',
          content: [
            '`队列（Queue）`一端进（队尾）一端出（队头）：push/back 看尾、front/pop 从头走。FIFO——像排队买票。',
            '典型应用：任务调度、消息缓冲、BFS 广度优先搜索、生产者-消费者模型。',
            'STL 的 std::queue 同样是适配器：push 入队、front 取队头、pop 出队、empty 判空。',
            '双端队列 deque 两头都能进出，滑动窗口最大值等题目专用；priority_queue 是堆实现的优先队列，队头永远是最大（或最小）值。',
          ],
          code: {
            lang: 'cpp',
            caption: 'queue 模拟打印任务调度',
            source: `#include <queue>

queue<string> printer;
printer.push("文档A");   // 入队
printer.push("文档B");
printer.push("文档C");

while (!printer.empty()) {
    cout << "正在打印: " << printer.front() << "\\n";
    printer.pop();        // 打印完出队
}
// 顺序：A → B → C（先进先出）

priority_queue<int> pq;   // 大顶堆
pq.push(3); pq.push(9); pq.push(5);
cout << pq.top();         // 9，最大者优先`,
          },
        },
        {
          title: '14.3 手写链表',
          content: [
            '`链表`每个节点存数据和下一个节点的指针：struct Node { int data; Node* next; }。插入删除 O(1)，随机访问 O(n)。',
            '头插法建表最简单：新节点指向旧头，再成为新头——几秒一个，但得到的是逆序表。',
            '删除节点要诀：先找到前驱，prev->next = target->next 跳过目标，再 delete target 释放。',
            '面试高频：反转链表（三指针 prev/cur/next 接力）、找中点（快慢指针）、判环（快慢指针相遇）。',
            '工程里直接用 std::list（双向链表）或 forward_list（单向），手写只为理解原理。',
          ],
          code: {
            lang: 'cpp',
            caption: '手写单链表：头插 + 遍历 + 反转',
            source: `struct Node {
    int data;
    Node* next;
};

Node* head = nullptr;
// 头插法：1、2、3 依次插入
for (int x : {1, 2, 3}) {
    head = new Node{x, head};
}
// 链表：3 -> 2 -> 1

// 反转：三指针接力
Node *prev = nullptr, *cur = head;
while (cur) {
    Node* nxt = cur->next;
    cur->next = prev;
    prev = cur;
    cur = nxt;
}
head = prev;   // 链表：1 -> 2 -> 3`,
          },
        },
      ],
      quiz: [
        {
          question: '实现"撤销（Undo）"功能最适合的数据结构是？',
          options: ['A. 队列', 'B. 栈', 'C. 数组', 'D. 哈希表'],
          answer: 'B',
          explanation: '撤销要"最后做的先撤销"，正是栈的后进先出语义。',
        },
        {
          question: 'STL 中 priority_queue 的队头元素是？',
          answer: '默认是最大值（大顶堆）；传 greater<int> 可变为最小值优先',
          explanation: 'priority_queue 用堆维护，push/pop 都是 O(log n)，适合"动态取最值"场景。',
        },
        {
          question: '反转单链表需要几个指针？分别做什么？',
          answer: '三个：prev（已反转部分的头）、cur（当前处理节点）、nxt（暂存后继防止链断）',
          explanation: '每轮把 cur->next 指向 prev 完成局部反转，然后三个指针整体前移，直到 cur 为空。',
        },
      ],
    },
    {
      id: 'cpp-ch15',
      title: '第 15 章 竞赛与面试常用技巧',
      intro: '最后一章送上实战锦囊：快读优化让输入不再拖后腿、常用宏与写法让代码减半、调试与对拍方法论、以及竞赛中最常考的知识点清单。',
      sections: [
        {
          title: '15.1 输入输出优化',
          content: [
            'cin/cout 默认与 stdio 同步，十万级输入就明显变慢。两行咒语提速：ios::sync_with_stdio(false); cin.tie(nullptr);。',
            '加上之后不要再混用 scanf/printf 和 cin/cout，同步关掉后混用会出错序。',
            ' endl 会刷新缓冲区，循环里输出用 "\\n" 代替 endl，又省一大截时间。',
            '超大数据终极方案：手写快读（getchar 逐字符解析整数），比 cin 快十倍，模板背下来即可。',
          ],
          code: {
            lang: 'cpp',
            caption: '竞赛标准开头与手写快读',
            source: `#include <bits/stdc++.h>
using namespace std;

// 手写快读：读整数比 cin 快一个量级
inline int read() {
    int x = 0, f = 1; char c = getchar();
    while (c < '0' || c > '9') { if (c == '-') f = -1; c = getchar(); }
    while (c >= '0' && c <= '9') { x = x * 10 + c - '0'; c = getchar(); }
    return x * f;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n = read();
    cout << n << "\\n";   // 用 \\n 不用 endl
}`,
          },
        },
        {
          title: '15.2 常用宏、别名与代码模板',
          content: [
            '#include <bits/stdc++.h> 一个头文件包含全部标准库，竞赛标配（工程里别用，编译慢）。',
            '常用别名：using ll = long long; using pii = pair<int,int>; 显著缩短代码。',
            '宏：#define INF 0x3f3f3f3f（无穷大且相加不溢出）、#define rep(i,n) for(int i=0;i<(n);i++)。',
            'memset 初始化：memset(dp, 0x3f, sizeof dp) 把数组设成 INF——0x3f 的妙处是每个字节相同才能用 memset。',
          ],
          code: {
            lang: 'cpp',
            caption: '竞赛模板起手式',
            source: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;
const int INF = 0x3f3f3f3f;

int main() {
    vector<pii> v = {{2, 100}, {1, 50}};
    sort(v.begin(), v.end());  // pair 默认按 first 再 second 排
    // (1,50) (2,100)

    int dp[100];
    memset(dp, 0x3f, sizeof dp);  // 全部初始化为 INF
}`,
          },
        },
        {
          title: '15.3 调试、对拍与高频考点',
          content: [
            '本地调试：freopen("in.txt", "r", stdin) 把文件当标准输入，提交前删掉或注释。',
            '`对拍`：写个"笨但绝对正确"的暴力程序，再写随机数据生成器，让两个程序对几十万组数据比对输出——找反例的神器。',
            '高频考点清单：模拟、二分答案、前缀和与差分、双指针、DFS/BFS、动态规划、并查集、最短路。',
            '估复杂度：一般评测机每秒约 1e8 次运算。n≤20 想状压/暴搜，n≤5000 想 O(n²)，n≤1e5 想 O(n log n)，n≤1e6 必须 O(n)。',
          ],
          code: {
            lang: 'cpp',
            caption: '文件输入 + 复杂度速查',
            source: `int main() {
#ifndef ONLINE_JUDGE
    freopen("in.txt", "r", stdin);   // 本地从文件读
#endif
    // ... 正常写 cin/scanf
}

/* 数据范围 → 算法选型
n ≤ 20    : O(2^n) 状压/子集枚举
n ≤ 500   : O(n^3)  Floyd 等
n ≤ 5000  : O(n^2)  基础 DP
n ≤ 1e5   : O(n log n)  排序/二分/堆
n ≤ 1e6+  : O(n) 或 O(n log n) 卡常 */`,
          },
        },
      ],
      quiz: [
        {
          question: 'ios::sync_with_stdio(false) 之后要注意什么？',
          options: ['A. 必须用 printf', 'B. 不能再混用 cin/cout 与 scanf/printf', 'C. 必须开新线程', 'D. 不能再用 vector'],
          answer: 'B',
          explanation: '关闭同步后两套 IO 各自缓冲，混用会导致输出顺序错乱。要么全 cin/cout，要么全 scanf/printf。',
        },
        {
          question: 'memset(dp, 0x3f, sizeof dp) 为什么能把 int 数组设成"无穷大"？',
          answer: 'memset 按字节填充，0x3f3f3f3f 四个字节恰好都是 0x3f；这个值约 1e9 且两数相加不溢出 int',
          explanation: '只有四字节相同的值才能用 memset 按字节填充；0x3f3f3f3f 是竞赛约定的 INF。',
        },
        {
          question: '"对拍"指的是什么调试方法？',
          answer: '用随机数据同时喂给"正解程序"和"暴力程序"，比对输出是否一致，快速找到让正解出错的数据',
          explanation: '暴力程序慢但易写对，是验证高效算法的黄金参照物；配上数据生成器可自动化跑上万组。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'cpp-p1',
      title: '读程序写结果：指针与数组',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        '指针题的画图法：画出内存格子，标出每个指针指向哪里，逐步跟踪 * 与 ++ 的作用。',
        '优先级记忆：*p++ 等价于 *(p++)（先用后移），(*p)++ 是值加 1。',
      ],
      keyPoints: ['* 与 ++ 的优先级', '指针步长 = 类型大小', '数组名是常量指针', 'sizeof 指针 vs 数组'],
      example: {
        question: 'int a[] = {10, 20, 30}; int* p = a; cout << *p++ << " " << *p; 输出什么？',
        answer: '10 20',
        explanation: '*p++ 先取 *p（10）输出，然后 p 指向 a[1]；第二个 *p 取出 20。',
      },
      traps: ['以为 *p++ 是 (*p)++', '忘记指针已移动', '越界访问未定义行为仍试图"算"出确定值'],
    },
    {
      id: 'cpp-p2',
      title: '程序改错：引用与指针混用',
      category: '程序改错',
      difficulty: 3,
      analysis: [
        '引用必须初始化、不能改绑、不存在空引用；指针可以不初始化（危险）、可改指向、可为空。改错题常在这三点上做文章。',
        '函数想修改实参：用引用 int& 或指针 int*，形参为值传递则改不到外面。',
      ],
      keyPoints: ['引用定义即初始化', '值传递改不了实参', 'swap 的标准写法', 'nullptr 判空'],
      example: {
        question: '改错：void swap(int a, int b) { int t = a; a = b; b = t; } 调用后 x, y 未交换，为什么？如何改？',
        answer: '值传递只交换了副本。改为 void swap(int& a, int& b)，函数体不变。',
        explanation: '引用是实参的别名，函数内修改直接作用于原变量。',
      },
      traps: ['以为值传递能改实参', 'int& 与 int* 混淆', '交换逻辑缺少临时变量'],
    },
    {
      id: 'cpp-p3',
      title: '选择题：构造与析构调用顺序',
      category: '选择题',
      difficulty: 4,
      analysis: [
        '对象生命周期题的标准套路：列时间线。创建顺序 = 构造顺序；离开作用域按逆序析构。',
        '传值参数、返回值、临时对象都会触发拷贝构造，一条语句可能隐含着多次构造/析构。',
      ],
      keyPoints: ['先构造的后析构', '拷贝构造触发时机', '临时对象语句结束即析构', '静态对象程序结束才析构'],
      example: {
        question: 'main 中依次创建对象 A a; B b; 函数结束时析构顺序是？',
        answer: '先 ~B() 后 ~A()',
        explanation: '栈结构后进先出：后构造的对象先析构。',
      },
      traps: ['以为按创建顺序析构', '忽略传参产生的临时副本', '把 new 出的对象当作自动析构（需要 delete）'],
    },
    {
      id: 'cpp-p4',
      title: '编程题：STL 容器应用',
      category: '编程题',
      difficulty: 3,
      analysis: [
        'STL 题考察"选对容器"：要下标访问用 vector；要去重排序用 set；要键值查找用 map；要先进先出用 queue。',
        '配合 <algorithm> 的 sort/find/count 可以秒杀大部分数组处理题。',
      ],
      keyPoints: ['vector 常用操作', 'map 计数模板', 'sort 自定义比较', '范围 for 遍历'],
      example: {
        question: '读入一组整数存 vector，排序后去重输出。',
        code: `vector<int> v = {3, 1, 3, 5, 1};
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
for (int x : v) cout << x << " ";  // 1 3 5`,
        answer: '1 3 5',
        explanation: 'sort + unique + erase 是 STL 去重三连的固定套路：unique 把重复移到尾部并返回新逻辑末尾，erase 真正删除。',
      },
      traps: ['忘记 sort 就直接 unique（只去相邻重复）', 'unique 后忘记 erase', '遍历时修改 vector 导致迭代器失效'],
    },
    {
      id: 'cpp-p5',
      title: '读程序写结果：虚函数与多态',
      category: '读程序写结果',
      difficulty: 5,
      analysis: [
        '判断一次调用是否多态：看函数是否 virtual、调用方是否基类指针/引用。对象直接调用（obj.func()）不发生多态。',
        '构造函数中调用虚函数不多态（对象尚未完全构造），析构中同理。',
      ],
      keyPoints: ['virtual 才有动态绑定', '指针/引用才触发多态', '纯虚函数 → 抽象类', '虚析构防泄漏'],
      example: {
        question: 'class Base { public: virtual void f(){ cout<<"B"; } }; class Derived : public Base { public: void f(){ cout<<"D"; } }; Base* p = new Derived(); p->f(); 输出？若去掉 virtual 呢？',
        answer: '有 virtual 输出 D；去掉 virtual 输出 B',
        explanation: 'virtual 使 f 进入虚表，运行时按实际对象类型 Derived 调用；非虚函数静态绑定，按指针声明类型 Base 调用。',
      },
      traps: ['忽略 virtual 关键字的有无', '以为对象直接调用也会多态', 'delete 基类指针忘记虚析构'],
    },
    {
      id: 'cpp-p6',
      title: '程序填空：运算符重载',
      category: '程序填空',
      difficulty: 4,
      analysis: [
        '运算符重载填空的核心是记住签名形式：成员函数版少一个左操作数（this 充当）；友元版两个操作数都显式写出。',
        '<< 和 >> 必须用友元或普通函数重载（左操作数是 ostream，不是自己的类）。',
      ],
      keyPoints: ['成员版 vs 友元版', '返回引用支持链式（+=）', '前置++返回引用，后置++带 int 哑元', 'cout << 必须友元'],
      example: {
        question: '为 Complex 类补全前置 ++ 运算符（实部虚部各加 1）。',
        answer: 'Complex& operator++() { ++re; ++im; return *this; }',
        explanation: '前置 ++ 返回自身引用以支持连续操作；后置版本签名为 operator++(int)，先存副本再自增返回副本。',
      },
      traps: ['前置后置签名混淆', '返回局部对象的引用（悬垂）', '忘记 const 修饰参数'],
    },
  ],
  exercises: [
    {
      id: 'cpp-e1', type: 'choice', title: 'cout 输出格式', difficulty: 1, tags: ['入门'],
      question: '执行 cout << 7 / 2 << " " << 7.0 / 2; 输出为？',
      options: ['A. 3.5 3.5', 'B. 3 3.5', 'C. 3 3', 'D. 编译错误'],
      answer: 'B',
      explanation: '整数除法 7/2=3；只要有一个浮点数参与即得浮点结果 3.5。',
    },
    {
      id: 'cpp-e2', type: 'choice', title: '引用特性', difficulty: 2, tags: ['引用'],
      question: '关于 C++ 引用，下列说法错误的是？',
      options: [
        'A. 引用定义时必须初始化',
        'B. 引用可以重新绑定到另一个变量',
        'C. 引用是变量的别名，共享同一内存',
        'D. 函数用引用参数可以修改实参',
      ],
      answer: 'B',
      explanation: '引用一旦绑定终身不改，之后的"赋值"改的是被绑定变量的值，不是重新绑定。',
    },
    {
      id: 'cpp-e3', type: 'choice', title: '函数重载', difficulty: 3, tags: ['函数'],
      question: '下列哪组函数构成合法重载？',
      options: [
        'A. int f(int); double f(int);',
        'B. int f(int); int f(double);',
        'C. int f(int a); int f(int b);',
        'D. void f(); int f();',
      ],
      answer: 'B',
      explanation: '重载靠参数列表（类型/个数/顺序）区分；仅返回值不同（A、D）或仅参数名不同（C）不构成重载。',
    },
    {
      id: 'cpp-e4', type: 'choice', title: '指针运算', difficulty: 4, tags: ['指针'],
      question: 'int a[5] = {1,2,3,4,5}; int* p = a + 2; cout << *p; 输出为？',
      options: ['A. 1', 'B. 2', 'C. 3', 'D. 地址值'],
      answer: 'C',
      explanation: 'a + 2 指向 a[2]，解引用得 3。指针 +n 按元素步进 n 个位置。',
    },
    {
      id: 'cpp-e5', type: 'choice', title: '虚函数', difficulty: 4, tags: ['多态'],
      question: '关于虚函数，正确的是？',
      options: [
        'A. 静态成员函数可以是虚函数',
        'B. 构造函数可以是虚函数',
        'C. 析构函数可以是（且通常是）虚函数',
        'D. 虚函数在编译期绑定',
      ],
      answer: 'C',
      explanation: '析构函数可以是虚函数，且基类析构应为虚函数。静态函数与构造函数都不能是虚函数；虚函数是运行时绑定。',
    },
    {
      id: 'cpp-e6', type: 'fill', title: '补全引用交换', difficulty: 2, tags: ['引用', '函数'],
      question: '补全函数实现两个整数的交换：void swap(int& a, ______ b) { int t = a; a = b; b = t; }',
      answer: 'int&',
      explanation: '两个参数都必须用引用传递，否则只有第一个能被修改。',
    },
    {
      id: 'cpp-e7', type: 'fill', title: '动态内存配对', difficulty: 3, tags: ['内存'],
      question: 'int* p = new int[10]; 释放这块内存的正确语句是 ______。',
      answer: 'delete[] p;',
      explanation: 'new[] 必须配 delete[]，混用 delete 是未定义行为。',
    },
    {
      id: 'cpp-e8', type: 'coding', title: 'Hello C++ 与累加', difficulty: 1, tags: ['入门'],
      question: '第一行输出 "Hello C++"，第二行输出 1 到 100 的和，格式 "sum = 5050"。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // 在这里编写代码

    return 0;
}`,
      expectedOutput: 'Hello C++\nsum = 5050',
      answer: 'cout << "Hello C++" << endl; 配合 for 循环累加。',
      explanation: '熟悉 iostream 输出与 for 循环的基本结构。',
      hints: ['cout << 可以链式输出', 'sum += i'],
    },
    {
      id: 'cpp-e9', type: 'coding', title: '三个数求最大值', difficulty: 2, tags: ['分支'],
      question: '给定 int a = 12, b = 7, c = 19; 输出最大值，格式 "max = 19"。不允许用数组或 algorithm 头文件。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 7, c = 19;
    // 求最大值

    return 0;
}`,
      expectedOutput: 'max = 19',
      answer: 'int m = a; if (b > m) m = b; if (c > m) m = c;',
      explanation: '打擂台法：先假设 a 最大，逐个挑战。',
      hints: ['用中间变量 m', '两个 if 顺序比较'],
    },
    {
      id: 'cpp-e10', type: 'coding', title: '字符串反转输出', difficulty: 3, tags: ['string'],
      question: '将 string s = "CodeMatrix"; 反转输出 "xirtaMedoC"。',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "CodeMatrix";
    // 反转输出

    return 0;
}`,
      expectedOutput: 'xirtaMedoC',
      answer: 'for (int i = s.length() - 1; i >= 0; i--) cout << s[i]; 或 reverse(s.begin(), s.end()) 后输出。',
      explanation: '倒序下标遍历最直观；用 <algorithm> 的 reverse 更简洁。',
      hints: ['s.length() - 1 是最后一个下标', '注意 int i >= 0 条件'],
    },
    {
      id: 'cpp-e11', type: 'coding', title: '统计数组中的偶数', difficulty: 3, tags: ['数组'],
      question: 'int v[] = {1, 2, 3, 4, 5, 6}; 统计并输出偶数个数，格式 "even = 3"。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int v[] = {1, 2, 3, 4, 5, 6};
    // 统计偶数

    return 0;
}`,
      expectedOutput: 'even = 3',
      answer: 'int cnt = 0; for (int i = 0; i < 6; i++) if (v[i] % 2 == 0) cnt++;',
      explanation: '遍历数组用取余判断偶数，计数器累加。',
      hints: ['v[i] % 2 == 0', '别忘了输出格式 even = '],
    },
    {
      id: 'cpp-e12', type: 'coding', title: '冒泡排序实现', difficulty: 4, tags: ['数组', '算法'],
      question: '用冒泡排序将数组 {5, 2, 8, 1, 9} 升序排序，输出一行，数字间空格分隔："1 2 5 8 9"（行尾不留空格）。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a[] = {5, 2, 8, 1, 9};
    int n = 5;
    // 冒泡排序

    // 输出

    return 0;
}`,
      expectedOutput: '1 2 5 8 9',
      answer: '双重循环：for i in 0..n-2，for j in 0..n-2-i，a[j] > a[j+1] 则交换；输出时下标 0 直接输出，其余先输出空格。',
      explanation: '外层控制轮数，内层每轮把最大值"冒泡"到末尾，n-1-i 是内层上界。',
      hints: ['j < n - 1 - i', 'if (i > 0) cout << " "; 再 cout << a[i]; 控制空格'],
    },
    {
      id: 'cpp-e13', type: 'choice', title: '引用折叠与传参', difficulty: 4, tags: ['引用'],
      question: 'void f(int& x) { x = 100; } int a = 1; f(a); 之后 a 的值是？',
      options: ['A. 1', 'B. 100', 'C. 未定义', 'D. 编译错误'],
      answer: 'B',
      explanation: '引用参数是实参的别名，函数内修改直接作用于 a。',
    },
    {
      id: 'cpp-e14', type: 'choice', title: '拷贝构造时机', difficulty: 5, tags: ['类'],
      question: '下列哪个不会调用拷贝构造函数？（A 是某个类）',
      options: ['A. A a = b;', 'B. void f(A x) 传参', 'C. A a; a = b;', 'D. return 局部对象'],
      answer: 'C',
      explanation: 'a = b 对已存在对象赋值，调用的是赋值运算符 operator=；其余三个都是"用已有对象创建新对象"，走拷贝构造。',
    },
    {
      id: 'cpp-e15', type: 'choice', title: '静态成员', difficulty: 4, tags: ['类'],
      question: '关于 static 成员，下列说法错误的是？',
      options: [
        'A. 静态成员变量需要在类外定义初始化',
        'B. 静态成员函数可以用对象调用',
        'C. 静态成员函数中可以访问非静态成员',
        'D. 静态成员被所有对象共享',
      ],
      answer: 'C',
      explanation: '静态成员函数没有 this 指针，无法访问非静态成员。其余说法均正确。',
    },
    {
      id: 'cpp-e16', type: 'choice', title: 'STL 去重套路', difficulty: 4, tags: ['STL'],
      question: '对 vector<int> v 去重的正确顺序是？',
      options: [
        'A. unique → sort → erase',
        'B. sort → unique → erase',
        'C. erase → unique → sort',
        'D. sort → erase → unique',
      ],
      answer: 'B',
      explanation: '先 sort 使重复相邻 → unique 把重复移到尾部返回逻辑末尾 → erase 真正删除。固定三连，缺一不可。',
    },
    {
      id: 'cpp-e17', type: 'choice', title: '菱形继承', difficulty: 5, tags: ['继承'],
      question: '解决菱形继承（钻石问题）中基类成员重复二义性的机制是？',
      options: ['A. 模板', 'B. 虚继承 virtual inheritance', 'C. 友元', 'D. 命名空间'],
      answer: 'B',
      explanation: 'class B : virtual public A 使共同基类 A 在最终派生类中只有一份实例，消除二义性。',
    },
    {
      id: 'cpp-e18', type: 'choice', title: 'map 自动插入', difficulty: 4, tags: ['STL'],
      question: 'map<string,int> m; cout << m["hello"]; 输出是？',
      options: ['A. 报错：键不存在', 'B. 0', 'C. 随机值', 'D. 空'],
      answer: 'B',
      explanation: 'map 的 operator[] 对不存在的键会插入值初始化的默认值（int 为 0）并返回其引用。',
    },
    {
      id: 'cpp-e19', type: 'fill', title: '补全范围 for', difficulty: 2, tags: ['循环'],
      question: '遍历并修改 vector<int> v 中每个元素翻倍：for (______ x : v) { x *= 2; }',
      answer: 'int&（或 auto&）',
      explanation: '必须用引用遍历才能修改容器内元素；int x 只是副本，改了不影响原容器。',
    },
    {
      id: 'cpp-e20', type: 'fill', title: '补全纯虚函数', difficulty: 3, tags: ['多态'],
      question: '把 Shape 声明为抽象类：virtual double area() ______ = 0;',
      answer: 'const（位置在 = 0 之前；若题目只考纯虚函数语法，核心是 "= 0"）',
      explanation: '纯虚函数的标志是声明末尾 = 0；含纯虚函数的类不能实例化。成员函数尾部的 const 表示不修改成员。',
    },
    {
      id: 'cpp-e21', type: 'fill', title: '补全成员初始化列表', difficulty: 4, tags: ['类'],
      question: 'class P { const int id; public: P(int i) ______ { } }; 补全使 const 成员正确初始化。',
      answer: ': id(i)',
      explanation: 'const 成员和引用成员必须在构造函数的初始化列表中初始化，函数体内赋值来不及。',
    },
    {
      id: 'cpp-e22', type: 'coding', title: '打印等腰三角形', difficulty: 4, tags: ['循环', '图形'],
      question: '用星号打印 4 行等腰三角形：\n   *\n  ***\n *****\n*******\n（第 i 行有 4-i 个前导空格和 2i-1 个星号）',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    // 外层行，内层先打印空格再打印星号

    return 0;
}`,
      expectedOutput: '   *\n  ***\n *****\n*******',
      answer: 'for i 从 1 到 n：先内层循环打印 n-i 个空格，再内层循环打印 2*i-1 个星号，每行 endl。',
      explanation: '图形题核心是把"第几行"翻译成空格数与星号数的表达式：空格 n-i，星号 2i-1。',
      hints: ['for (int j = 0; j < n - i; j++) cout << " ";', 'for (int j = 0; j < 2 * i - 1; j++) cout << "*";'],
    },
    {
      id: 'cpp-e23', type: 'coding', title: '数组中第二大的数', difficulty: 5, tags: ['数组', '算法'],
      question: '数组 int a[] = {3, 9, 1, 9, 5, 7}; 中第二大的数是 7。输出 "second = 7"。要求一遍遍历完成（不允许排序）。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a[] = {3, 9, 1, 9, 5, 7};
    int n = 6;
    // 维护最大值 first 与次大值 second

    return 0;
}`,
      expectedOutput: 'second = 7',
      answer: 'first、second 初始为极小值；遍历时若 a[i] > first 则 second=first、first=a[i]；否则若 a[i] > second 且 a[i] < first 则 second=a[i]（去重）。',
      explanation: '一遍扫描同时维护前两名是经典面试题。注意"严格小于 first"的条件用于处理最大值重复的情况。',
      hints: ['int first = -1000000, second = -1000000;', 'if (a[i] > first) { second = first; first = a[i]; }', 'else if (a[i] > second && a[i] < first) second = a[i];'],
    },
    {
      id: 'cpp-e24', type: 'coding', title: '统计字符串字符分类', difficulty: 4, tags: ['string', '循环'],
      question: 'string s = "Hello2024Cpp"; 统计其中大写字母、小写字母、数字的个数，输出三行：\nupper = 2\nlower = 6\ndigit = 4',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello2024Cpp";
    int upper = 0, lower = 0, digit = 0;
    // 遍历分类统计

    cout << "upper = " << upper << endl;
    cout << "lower = " << lower << endl;
    cout << "digit = " << digit << endl;
    return 0;
}`,
      expectedOutput: 'upper = 2\nlower = 6\ndigit = 4',
      answer: 'for (int i = 0; i < s.length(); i++) 用字符范围比较分类：\'A\'<=s[i]<=\'Z\'、\'a\'<=s[i]<=\'z\'、\'0\'<=s[i]<=\'9\'。',
      explanation: '字符比较本质是 ASCII 数值比较。大写为 H 和 C 共 2 个，小写为 e/l/l/o/p/p 共 6 个，数字 2024 共 4 个。',
      hints: ['s[i] >= \'A\' && s[i] <= \'Z\'', '三个 if 分开写或 if-else 链均可'],
    },
  ],
}
