import MovieDetail from '../model/MovieDetail.js'
import dbConn from '../db/connection.js'

async function deleteNoBudget() {
    await dbConn();
    // budget 값이 0인 문서의 개수 확인
    let count = await MovieDetail.countDocuments({ budget: 0});
    console.log(`Number of documents with budget 0: ${count}`);

    // 절반의 문서 개수 계산
    const halfCount = Math.floor(count / 2);

    const res = await MovieDetail.find({ budget: 0 }, { _id: 1 })
        .limit(halfCount)

    res.forEach(async (md) => {
        console.log(md._id.toString())
        await MovieDetail.deleteOne({ _id: md._id })
    })

    count = await MovieDetail.countDocuments({ budget: 0});
    console.log(`Number of documents with budget 0 After delete : ${count}`);
}

deleteNoBudget()