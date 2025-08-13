<script setup>
import { ref } from "vue";
import { EVENT_CODE } from 'element-plus';
import { ElementPlus, Search } from '@element-plus/icons-vue';

// 基础用法
const input1 = ref([]);

// 自定义触发器
const trigger = ref('Space');
const input2 = ref([]);
const options = [EVENT_CODE.enter, EVENT_CODE.space];

// 最大标签数
const input3 = ref([]);

// 禁用状态
const input4 = ref(['tag1', 'tag2', 'tag3']);

// 可清空
const input5 = ref(['tag1', 'tag2', 'tag3']);

// 可拖放
const input6 = ref(['tag1', 'tag2', 'tag3']);

// 分隔符
const input7 = ref([]);

// 尺寸
const input8 = ref([]);

// 自定义标签
const type = ['primary', 'success', 'info', 'warning', 'danger'];
const effect = ['light', 'dark', 'plain'];
const tagType = ref('primary');
const tagEffect = ref('plain');
const input9 = ref(['tag1', 'tag2', 'tag3']);

// 自定义前缀和后缀
const input10 = ref([]);
</script>

<template>
  <div class="input-tag-demo">
    <h1>ElInputTag 组件示例</h1>
    
    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>按Enter回车键添加输入内容为标签</p>
      <el-input-tag
        v-model="input1"
        placeholder="Please input"
        aria-label="Please click the Enter key after input"
      />
      <pre>{{ input1 }}</pre>
    </div>

    <!-- 自定义触发器 -->
    <div class="demo-section">
      <h2>自定义触发器</h2>
      <p>您可以自定义用于触发输入标签的键位，默认是Enter回车键</p>
      <div>
        <el-segmented v-model="trigger" :options="options" />
      </div>
      <br />
      <el-input-tag v-model="input2" :trigger="trigger" placeholder="Please input" />
      <pre>{{ input2 }}</pre>
    </div>

    <!-- 最大标签数 -->
    <div class="demo-section">
      <h2>最大标签数</h2>
      <p>您可以设置可以添加的标签数量限制。</p>
      <el-input-tag v-model="input3" :max="3" placeholder="enter up to 3 tags" />
      <pre>{{ input3 }}</pre>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>您可以设置 InputTag 被禁用。</p>
      <el-input-tag v-model="input4" disabled placeholder="Please input" />
      <pre>{{ input4 }}</pre>
    </div>

    <!-- 可清空 -->
    <div class="demo-section">
      <h2>可清空</h2>
      <p>您可以设置是否显示清除按钮。</p>
      <el-input-tag v-model="input5" clearable placeholder="Please input" />
      <pre>{{ input5 }}</pre>
    </div>

    <!-- 可拖放 -->
    <div class="demo-section">
      <h2>可拖放</h2>
      <p>您可以设置是否可以拖动标签。</p>
      <el-input-tag v-model="input6" draggable placeholder="Please input" />
      <pre>{{ input6 }}</pre>
    </div>

    <!-- 分隔符 -->
    <div class="demo-section">
      <h2>分隔符</h2>
      <p>当一个分隔符匹配时，您可以添加一个标签。</p>
      <el-input-tag
        v-model="input7"
        draggable
        placeholder="Try to separate words with ,"
        delimiter=","
      />
      <pre>{{ input7 }}</pre>
    </div>

    <!-- 尺寸 -->
    <div class="demo-section">
      <h2>尺寸</h2>
      <p>使用 size 属性改变输入框大小。除了默认大小外，还有另外两个选项：large, small。</p>
      <el-input-tag v-model="input8" size="large" placeholder="Please input" />
      <br />
      <el-input-tag v-model="input8" placeholder="Please input" />
      <br />
      <el-input-tag v-model="input8" size="small" placeholder="Please input" />
      <pre>{{ input8 }}</pre>
    </div>

    <!-- 自定义标签 -->
    <div class="demo-section">
      <h2>自定义标签</h2>
      <p>您可以通过tag插槽自定义标签内容。</p>
      <div>
        <el-segmented v-model="tagType" :options="type" class="mr-5" />
        <el-segmented v-model="tagEffect" :options="effect" />
      </div>
      <br />
      <el-input-tag
        v-model="input9"
        :tag-type="tagType"
        :tag-effect="tagEffect"
        placeholder="Please input"
      >
        <template #tag="{ value }">
          <div class="flex items-center">
            <el-icon class="mr-1">
              <ElementPlus />
            </el-icon>
            <span>{{ value }}</span>
          </div>
        </template>
      </el-input-tag>
      <pre>{{ input9 }}</pre>
    </div>

    <!-- 自定义前缀和后缀 -->
    <div class="demo-section">
      <h2>自定义前缀和后缀</h2>
      <p>您可以通过prefix和 suffix 插槽自定义 InputTag 的前缀和后缀。</p>
      <el-input-tag v-model="input10" clearable placeholder="Please input">
        <template #prefix>
          <el-icon><ElementPlus /></el-icon>
        </template>
        <template #suffix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input-tag>
      <pre>{{ input10 }}</pre>
    </div>

    <!-- 当前所有数据 -->
    <div class="demo-section">
      <h2>当前所有数据</h2>
      <pre>{{ JSON.stringify({
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7,
        input8,
        input9,
        input10,
        trigger,
        tagType,
        tagEffect
      }, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.input-tag-demo {
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

.mr-5 {
  margin-right: 20px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.mr-1 {
  margin-right: 4px;
}

br {
  margin: 10px 0;
}
</style>
