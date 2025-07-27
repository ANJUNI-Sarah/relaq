import { Button } from '@/components/ui/button'
import Image  from 'next/image'


const FindShop = () => {
    const handleFindShop = () => {
        console.log("查找店家");
        // 在這裡添加查找店家的邏輯
    }

    
    return (
        <>
        <div className="flex">
            <Image src="icon.svg" alt="智能助理頭貼" />
            <p>哈囉! 我是你的智能助理，請盡量清楚說明你的需求，<br/>讓我來幫你找到合適的店家!</p>
        </div>
        <textarea />
        <Button onClick={handleFindShop}></Button>
        </>
    )
}