import styles from "./CompanyOrgChart.module.css";

export default function CompanyOrgChart() {
    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>Organization</h2>

            {/* ✅ 조직도 + 표를 하나의 드래그 영역으로 묶음 */}
            <div className={styles.dragArea}>
                <div className={styles.dragInner}>
                    {/* 조직도 카드 */}
                    <div className={styles.card}>
                        <div className={styles.chartScroll}>
                            <div className={styles.chartMinWidth}>
                                <div className={styles.tree}>
                                    <ul>
                                        <li>
                                            <div className={`${styles.node} ${styles.nodeStrong}`}>
                                                대표이사
                                            </div>

                                            <ul>
                                                <li>
                                                    <div className={styles.node}>관리/영업/구매</div>

                                                    <ul>
                                                        {/* LEFT */}
                                                        <li>
                                                            <div className={styles.node}>연구/개발</div>
                                                            <ul>
                                                                <li>
                                                                    <div className={styles.node}>전자</div>
                                                                    <ul>
                                                                        <li>
                                                                            <div className={styles.nodeSmall}>생산</div>
                                                                        </li>
                                                                        <li>
                                                                            <div className={styles.nodeSmall}>자재</div>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>

                                                        {/* RIGHT */}
                                                        <li>
                                                            <div className={styles.node}>품질관리</div>
                                                            <ul>
                                                                <li>
                                                                    <div className={styles.node}>태인 통신사업</div>
                                                                    <ul>
                                                                        <li>
                                                                            <div className={styles.nodeSmall}>자재</div>
                                                                        </li>
                                                                        <li>
                                                                            <div className={styles.nodeSmall}>조립</div>
                                                                        </li>
                                                                        <li>
                                                                            <div className={styles.nodeSmall}>
                                                                                완전출하
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 인원 표 카드 */}
                    <div className={styles.tableCard}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>구분인원</th>
                                    <th rowSpan={2}>관리/영업/구매</th>
                                    <th rowSpan={2}>연구/개발</th>
                                    <th colSpan={2}>전자</th>
                                    <th colSpan={3}>태인 통신사업부</th>
                                </tr>
                                <tr>
                                    <th>생산</th>
                                    <th>자재</th>
                                    <th>자재</th>
                                    <th>조립</th>
                                    <th>품질</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>9</td>
                                    <td>1</td>
                                    <td>외주</td>
                                    <td>8</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>8</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}