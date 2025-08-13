<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 基础用法数据
const data1 = ref({ value1: '@' });
const data2 = ref({ value2: '' });
const data3 = ref({ value3: '' });
const data4 = ref({ value4: '' });
const data5 = ref({ value5: '' });
const data6 = ref({ value6: '' });
const data7 = ref({ value7: '' });

const options1 = ref([
    {
        label: 'Fuphoenixes',
        value: 'Fuphoenixes',
    },
    {
        label: 'kooriookami',
        value: 'kooriookami',
    },
    {
        label: 'Jeremy',
        value: 'Jeremy',
    },
    {
        label: 'btea',
        value: 'btea',
    },
]);

// Textarea 数据
const options2 = ref([
    {
        label: 'Fuphoenixes',
        value: 'Fuphoenixes',
    },
    {
        label: 'kooriookami',
        value: 'kooriookami',
    },
    {
        label: 'Jeremy',
        value: 'Jeremy',
    },
    {
        label: 'btea',
        value: 'btea',
    },
]);

// 自定义标签数据
const options3 = ref([
    {
        value: 'Fuphoenixes',
        avatar: 'https://avatars.githubusercontent.com/u/27912232',
    },
    {
        value: 'kooriookami',
        avatar: 'https://avatars.githubusercontent.com/u/38392315',
    },
    {
        value: 'Jeremy',
        avatar: 'https://avatars.githubusercontent.com/u/15975785',
    },
    {
        value: 'btea',
        avatar: 'https://avatars.githubusercontent.com/u/24516654',
    },
]);

// 加载远程选项数据
const loading4 = ref(false);
const options4 = ref([]);

let timer;
const handleSearch = (pattern) => {
    if (timer) clearTimeout(timer);

    loading4.value = true;
    timer = setTimeout(() => {
        options4.value = ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'].map(
            (item) => ({
                label: pattern + item,
                value: pattern + item,
            })
        );
        loading4.value = false;
    }, 1500);
};

// 自定义触发字段数据
const MOCK_DATA = {
    '@': ['Fuphoenixes', 'kooriookami', 'Jeremy', 'btea'],
    '#': ['1.0', '2.0', '3.0'],
};
const options5 = ref([]);

const handleSearch5 = (_, prefix) => {
    options5.value = (MOCK_DATA[prefix] || []).map((value) => ({
        value,
    }));
};

// 整体删除数据
const options6 = ref(
    MOCK_DATA['@'].map((value) => ({ value }))
);
const options7 = ref([]);

const checkIsWhole = (pattern, prefix) => {
    return (MOCK_DATA[prefix] || []).includes(pattern);
};

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            alert('表单提交成功！');
        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
};

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
});
</script>

<template>
    <div class="mention-demo">
        <h1>ElMention 组件示例</h1>

        <!-- 基础用法 -->
        <div class="demo-section">
            <h2>基础用法</h2>
            <p>最简单的用法。</p>
            <FormKit type="el-form" v-model="data1">
                <FormKit type="el-mention" name="value1" label="基础提及" :options="options1" placeholder="Please input"
                    style="width: 320px" />
            </FormKit>
            <pre>{{ data1.value1 }}</pre>
        </div>

        <!-- Textarea -->
        <div class="demo-section">
            <h2>Textarea</h2>
            <p>输入类型可以设置为 textarea。</p>
            <FormKit type="el-form" v-model="data2">
                <FormKit type="el-mention" name="value2" label="Textarea 提及" input-type="textarea" :options="options2"
                    placeholder="Please input" style="width: 320px" />
            </FormKit>
            <pre>{{ data2.value2 }}</pre>
        </div>

        <!-- 自定义标签 -->
        <div class="demo-section">
            <h2>自定义标签</h2>
            <p>使用 "label" 自定义标签。</p>
            <FormKit type="el-form" v-model="data3">
                <FormKit type="el-mention" name="value3" label="自定义标签" :options="options3" placeholder="Please input"
                    style="width: 320px">
                    <template #label="{ item }">
                        <div style="display: flex; align-items: center">
                            <el-avatar :size="24" :src="item.avatar" />
                            <span style="margin-left: 6px">{{ item.value }}</span>
                        </div>
                    </template>
                </FormKit>
            </FormKit>
            <pre>{{ data3.value3 }}</pre>
        </div>

        <!-- 加载远程选项 -->
        <div class="demo-section">
            <h2>加载远程选项</h2>
            <p>异步加载选项。</p>
            <FormKit type="el-form" v-model="data4">
                <FormKit type="el-mention" name="value4" label="远程选项" :options="options4" :loading="loading4"
                    placeholder="Please input" style="width: 320px" @search="handleSearch" />
            </FormKit>
            <pre>{{ data4.value4 }}</pre>
        </div>

        <!-- 自定义触发字段 -->
        <div class="demo-section">
            <h2>自定义触发字段</h2>
            <p>通过 prefix 属性自定义触发字段。默认为 @, Array&lt;string&gt;。</p>
            <FormKit type="el-form" v-model="data5">
                <FormKit type="el-mention" name="value5" label="自定义触发字段" :options="options5" :prefix="['@', '#']"
                    placeholder="input @ to mention people, # to mention tag" style="width: 320px"
                    @search="handleSearch5" />
            </FormKit>
            <pre>{{ data5.value5 }}</pre>
        </div>

        <!-- 整体删除 -->
        <div class="demo-section">
            <h2>整体删除</h2>
            <p>将 whole 属性设置为 true，当您按下退格键时，此处的 mention 区域将作为一个整体被删除。</p>
            <FormKit type="el-form" v-model="data6">
                <FormKit type="el-mention" name="value6" label="整体删除 (基础)" whole :options="options6"
                    placeholder="Please input" style="width: 320px" />
            </FormKit>
            <pre>{{ data6.value6 }}</pre>

            <el-divider />

            <FormKit type="el-form" v-model="data7">
                <FormKit type="el-mention" name="value7" label="整体删除 (自定义)" :options="options7" :prefix="['@', '#']"
                    whole :check-is-whole="checkIsWhole" placeholder="input @ to mention people, # to mention tag"
                    style="width: 320px" @search="handleSearch5" />
            </FormKit>
            <pre>{{ data7.value7 }}</pre>
        </div>
    </div>
</template>

<style scoped>
.mention-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    background-color: #fafafa;
}

.demo-section h2 {
    color: #303133;
    margin-bottom: 10px;
    font-size: 18px;
}

.demo-section p {
    color: #606266;
    margin-bottom: 15px;
    font-size: 14px;
}

.demo-section pre {
    background-color: #f5f7fa;
    padding: 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
    margin-top: 10px;
    white-space: pre-wrap;
    word-break: break-all;
}

h1 {
    text-align: center;
    color: #303133;
    margin-bottom: 30px;
}

.el-divider {
    margin: 20px 0;
}
</style>
