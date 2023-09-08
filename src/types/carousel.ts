export interface Carousels {
    /**
     * 图片目标类型
     */
    href: string;
    /**
     * 图片id
     */
    id: number;
    /**
     * 图片描述
     */
    title: string;
    /**
     * 图片地址
     */
    url: string;
}
export type CarouselList =  Carousels[]