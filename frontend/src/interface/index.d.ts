export interface Deliver {
    /**
     * 投递id
     */
    id: number;
    /**
     * 记录信息
     */
    info: ListInfo;
    /**
     * 记录状态
     */
    status: number;
    work: WorkPublicObject;
}

/**
 * 记录信息
 */
export interface ListInfo {
    /**
     * 合同图片
     */
    contract?: string;
    /**
     * 创建时间
     */
    createdAt: string;
    /**
     * 面试时间
     */
    interViewAt: string;
    /**
     * 面试者信息
     */
    inviter?: Inviter;
    /**
     * 回复信息
     */
    reply: string;
    /**
     * 提示
     */
    tips: string;
    /**
     * 入职时间
     */
    workAt: string;
}

/**
 * 面试者信息
 */
export interface Inviter {
    /**
     * 邀请者角色
     */
    actor: string;
    /**
     * 邀请者id
     */
    id: string;
    /**
     * 邀请者姓名
     */
    name: string;
}

/**
 * 工作公开信息
 */
export interface WorkPublicObject {
    company: CompanyPublicObject;
    /**
     * 工作id
     */
    id: string;
    /**
     * 具体信息
     */
    info: WorkInfo;
    /**
     * 工作地点
     */
    locate: string;
    /**
     * 工资数据
     */
    salary: Salary;
    /**
     * 统计数据
     */
    statistics: Statistics;
}

/**
 * 公司公开信息
 */
export interface CompanyPublicObject {
    /**
     * 企业背景图
     */
    background: string;
    /**
     * 企业介绍
     */
    description: string;
    /**
     * 工厂logo
     */
    logo: string;
    /**
     * 工厂名
     */
    name: string;
    /**
     * 工厂简称
     */
    tagName: string;
    /**
     * 企业类型
     */
    type: string;
}

/**
 * 具体信息
 */
export interface WorkInfo {
    /**
     * 工作介绍
     */
    description?: string;
    /**
     * 工作特点
     */
    feature?: Feature[];
    /**
     * 工作简介
     */
    name: string;
    /**
     * 标签
     */
    tag: string[];
    /**
     * 工作类型
     */
    type: string;
}

export interface Feature {
    featureItem: FeatureItem[];
    /**
     * 特点名称
     */
    name: string;
}

export interface FeatureItem {
    /**
     * mdi图标
     */
    icon: string;
    /**
     * 是否为积极的
     */
    positive: boolean;
    /**
     * 特点内容
     */
    word: string;
}

/**
 * 工资数据
 */
export interface Salary {
    /**
     * 结算方式，["日"、"周"、"月"]
     */
    type: string;
    /**
     * 工资值，[最少工资,最多工资]
     */
    value: number[];
}

/**
 * 统计数据
 */
export interface Statistics {
    /**
     * 面试次数
     */
    deliver: number;
    /**
     * 浏览次数
     */
    view: number;
}